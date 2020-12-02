import React from "react";
import styled from "styled-components";

const TitleBar = () => {
  return (
    <TitleBarWrapper>
      <Title>Headway Link Shortener</Title>
      <SubTitle>
        Enter a url and an optional custom ending to shorten your link!
      </SubTitle>
    </TitleBarWrapper>
  );
};

export default TitleBar;

const TitleBarWrapper = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2.5em;
  font-family: sans-serif;
  font-weight: 500;
  font-style: italic;
  text-align: center;
`;

const SubTitle = styled.h3`
  font-size: 1em;
  font-family: sans-serif;
  font-weight: 300;
  text-align: center;
`;
