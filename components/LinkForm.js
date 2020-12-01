import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";

const ADD_LINK = gql`
  mutation($url: String!, $slug: String!) {
    createLink(url: $url, slug: $slug) {
      id
      url
      slug
    }
  }
`;

const LinkForm = () => {
  const [urlValue, setUrlValue] = useState("");
  const [createLink] = useMutation(ADD_LINK, {
    update(cache, { data: { createLink } }) {
      cache.modify({
        fields: {
          allLinks(existingLinks = [], { readField }) {
            const newLink = cache.writeFragment({
              data: createLink,
              fragment: gql`
                fragment NewLink on Link {
                  url
                  slug
                }
              `
            });
            return [...existingLinks, newLink];
          }
        }
      });
    }
  });

  return (
    <>
      <FormWrapper
        onSubmit={(e) => {
          e.preventDefault();
          createLink({
            variables: {
              url: urlValue,
              slug: "slug"
            }
          });
          setUrlValue("");
        }}
      >
        <UrlInputField
          type="text"
          onChange={(e) => setUrlValue(e.target.value)}
          value={urlValue}
          id="outlined-basic"
          label="URL to shorten"
          variant="outlined"
        ></UrlInputField>
        <SubmitButton type="submit" variant="contained" color="primary">
          Shorten!
        </SubmitButton>
      </FormWrapper>
    </>
  );
};

export default LinkForm;

const FormWrapper = styled.form`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: lightslategray;
`;

const UrlInputField = styled(TextField)`
  width: 400px;
`;

const SubmitButton = styled(Button)`
  height: 50px;
  margin: 20px !important;
`;
