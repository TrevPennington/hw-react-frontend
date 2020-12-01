import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from "@apollo/client";

import App from "./App";

const client = new ApolloClient({
  uri: "https://5sh2x.sse.codesandbox.io/",
  cache: new InMemoryCache()
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  rootElement
);

client
  .query({
    query: gql`
      query {
        allLinks {
          id
          url
        }
      }
    `
  })
  .then((result) => console.log(result));
