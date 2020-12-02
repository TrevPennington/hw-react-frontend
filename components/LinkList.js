import React from "react";
import { useQuery, gql } from "@apollo/client";
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
      {loading && <ListTitle>loading links...</ListTitle>}
      {error && <ListTitle>error retrieving links..</ListTitle>}
      {data && (
        <>
          <ListTitle>My links</ListTitle>
          {data.allLinks.map((item, index) => (
            <LinkItem link={item} key={index} />
          ))}
        </>
      )}
    </ListWrapper>
  );
};

export default LinkList;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 70px;
  margin-bottom: 100px;
`;

const ListTitle = styled.h3`
  text-align: center;
  margin-bottom: 40px;
  font-family: sans-serif;
  font-weight: 400;
  font-size: 1.5em;
`;
