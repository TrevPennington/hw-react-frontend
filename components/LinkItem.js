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

  return (
    <LinkItemWrapper>
      <p>{props.link.url}</p>
      <Button>Copy</Button>
      <Button onClick={() => deleteLinkFinal({ id: props.link.id })}>
        delete
      </Button>
    </LinkItemWrapper>
  );
};

export default LinkItem;

const LinkItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 20px;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.1);
`;
