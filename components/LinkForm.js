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
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const [customSlugValue, setCustomSlugValue] = useState("");
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

  const verifyLink = () => {
    try {
      new URL(urlValue);
    } catch (e) {
      return false;
    }
    return true;
  };

  const submitLinkToShorten = (e) => {
    e.preventDefault();

    let verified = verifyLink();
    if (!verified) {
      console.log("not a valid url");
      return;
    } else {
      console.log("VALID");
    }

    createLink({
      variables: {
        url: urlValue,
        slug: customSlugValue
      }
    });
    setUrlValue("");
    setCustomSlugValue("");
  };

  return (
    <>
      <FormWrapper
        onSubmit={(e) => {
          submitLinkToShorten(e);
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

        <UrlInputField
          type="text"
          onChange={(e) => setCustomSlugValue(e.target.value)}
          value={customSlugValue}
          id="outlined-basic"
          label="optional custom slug"
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
  height: 300px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
`;

const UrlInputField = styled(TextField)`
  width: 400px;
  margin: 20px !important;
`;

const SubmitButton = styled(Button)`
  height: 50px;
  margin: 20px !important;
`;
