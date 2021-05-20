import React from "react";
import styled from "styled-components";

function AlbumHeader({ title }) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

export default AlbumHeader;

const Container = styled.div`
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  left: 0;
`;
const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  font-family: "LeftistMonoSerif";
  letter-spacing: 2px;
`;

