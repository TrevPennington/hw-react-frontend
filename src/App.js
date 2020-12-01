import React from "react";
import TitleBar from "../components/TitleBar";
import LinkForm from "../components/LinkForm";
import LinkList from "../components/LinkList";
import styled from "styled-components";

export default function App() {
  return (
    <PageWrapper>
      <TitleBar />
      <LinkForm />
      <LinkList />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  max-width: 2000px;
  margin: auto;
`;
