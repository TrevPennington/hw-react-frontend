import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import LinkItem from "./LinkItem";
import styled from "styled-components";

const GET_ALL_LINKS = gql`
  query {
    allLinks {
      id
      url
      slug
    }
  }
`;

const LinkList = () => {
  const { loading, error, data } = useQuery(GET_ALL_LINKS);
  return (
    <ListWrapper>
      {loading && <p>loading links...</p>}
      {error && <p>error retrieving links..</p>}
      {data && (
        <>
          {data.allLinks.map((item, index) => (
            <LinkItem link={item} />
          ))}
        </>
      )}
    </ListWrapper>
  );
};

export default LinkList;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;
