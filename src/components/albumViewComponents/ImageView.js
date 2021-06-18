import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router";

function ImageView() {
  const location = useLocation();
  const url = location?.state.url;

  console.log(url);

  return (
    <Container>
      <Image>
        <img src={url} alt="" />
      </Image>
    </Container>
  );
}

export default ImageView;

const Container = styled.div`
  /* height: 100vh;
  width: 100vw; */
  background-color: black;
`;

const Image = styled.div`
  height: 100%;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;
