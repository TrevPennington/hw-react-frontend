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
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [urlError, setUrlError] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const [customSlugValue, setCustomSlugValue] = useState("");

  //https://www.apollographql.com/docs/react/data/mutations/
  const [
    createLink,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(ADD_LINK, {
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
            setUrlValue("");
            setCustomSlugValue("");
            return [...existingLinks, newLink];
          }
        }
      });
    }
  });

  const verifyLink = (props) => {
    setUrlValue(props.url);

    //https://developer.mozilla.org/en-US/docs/Web/API/URL
    try {
      new URL(props.url);
    } catch (e) {
      setUrlError(true);
      return false;
    }
    setUrlError(false);
    setButtonDisabled(false);
    return true;
  };

  const submitLinkToShorten = (e) => {
    e.preventDefault();

    createLink({
      variables: {
        url: urlValue,
        slug: customSlugValue
      }
    }).catch((e) => {
      console.log(e);
      return;
    });
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
          onChange={(e) => verifyLink({ url: e.target.value })}
          value={urlValue}
          id="outlined-basic"
          label="URL to shorten"
          variant="outlined"
          error={urlError}
        ></UrlInputField>

        <UrlInputField
          type="text"
          onChange={(e) => setCustomSlugValue(e.target.value)}
          value={customSlugValue}
          id="outlined-basic"
          label="optional custom slug"
          variant="outlined"
        ></UrlInputField>

        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={buttonDisabled}
        >
          Shorten!
        </SubmitButton>
        {mutationLoading && <LoadingMessage>Loading...</LoadingMessage>}
        {mutationError && (
          <ErrorMessage>
            This slug already exists, please choose a different one!
          </ErrorMessage>
        )}
      </FormWrapper>
    </>
  );
};

export default LinkForm;

const FormWrapper = styled.form`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #efefef;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const UrlInputField = styled(TextField)`
  width: 400px !important;
  margin: 20px !important;

  @media (max-width: 700px) {
    width: 90% !important;
  }
`;

const SubmitButton = styled(Button)`
  height: 50px;
  margin: 20px !important;
`;

const LoadingMessage = styled.p`
  font-family: sans-serif;
`;

const ErrorMessage = styled.p`
  font-family: sans-serif;
  color: red;
`;
