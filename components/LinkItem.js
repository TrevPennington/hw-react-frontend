import React from "react";
import { useMutation, gql } from "@apollo/client";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const DELETE_LINK = gql`
  mutation deleteLink($id: Int!) {
    deleteLink(id: $id)
  }
`;

const LinkItem = (props) => {
  const [deleteLink] = useMutation(DELETE_LINK);

  const deleteLinkFinal = (props) => {
    deleteLink({
      variables: {
        id: props.id
      },
      update(cache) {
        cache.modify({
          fields: {
            allLinks(existingLinks = [], { readField }) {
              return existingLinks.filter(
                (linkRef) => props.id !== readField("id", linkRef)
              );
            }
          }
        });
      }
    });
  };

  const copyToClipBoard = (props) => {
    //navigator.clipboard.writeText(props.text);
    //^ this produces an error

    alert("Copied the text: " + props.text);
  };

  return (
    <LinkItemWrapper>
      <LinkTitle>{props.link.url}</LinkTitle>
      <ButtonBar>
        <Button
          onClick={() => copyToClipBoard({ text: props.link.url })}
          variant="contained"
          color="secondary"
        >
          Copy
        </Button>
        <Button onClick={() => deleteLinkFinal({ id: props.link.id })}>
          delete
        </Button>
      </ButtonBar>
    </LinkItemWrapper>
  );
};

export default LinkItem;

const LinkItemWrapper = styled.div`
  width: 80%;
  max-width: 800px;
  min-height: 90px;
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 800px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const LinkTitle = styled.h3`
  margin-left: 20px;
  font-family: sans-serif;
  font-size: 1em;
  text-align: center;
`;

const ButtonBar = styled.div`
  margin-right: 20px;
`;
