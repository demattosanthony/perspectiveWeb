import React from "react";
import styled from "styled-components";

function MyAlbums() {
  return (
    <Container>
      <Title>My Albums</Title>
    </Container>
  );
}

export default MyAlbums;

const Container = styled.div`
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Title = styled.div`
  margin-top: 100px;
  font-size: 40px;
  font-weight: bold;
  font-family: "Leftist Mono Serif", sans-serif;
`;
