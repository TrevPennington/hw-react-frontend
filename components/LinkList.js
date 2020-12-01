import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
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
    <>
      {loading && <p>loading links...</p>}
      {error && <p>error retrieving links..</p>}
      {data && (
        <>
          {data.allLinks.map((item, index) => (
            <p>{item.url}</p>
          ))}
        </>
      )}
    </>
  );
};

export default LinkList;
