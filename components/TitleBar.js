import React from "react";
import styled from "styled-components";

const TitleBar = () => {
  return (
    <TitleBarWrapper>
      <Title>Headway URL Shortener</Title>
    </TitleBarWrapper>
  );
};

export default TitleBar;

const TitleBarWrapper = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 1.8em;
  font-family: sans-serif;
`;
