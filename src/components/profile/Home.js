import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Profile from "./Profile";
import MyAlbums from "./MyAlbums";

function Home() {
  return (
    <Container>
      <Header />
      <BodyContainer>
        <Profile />
        <MyAlbums />
      </BodyContainer>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const BodyContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
