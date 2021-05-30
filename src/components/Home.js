import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Profile from "./Profile";
import MyAlbums from "./MyAlbums";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../features/user/userSlice";

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        history.push("/login");
      } else {
        dispatch(
          setUserLogin({
            userId: user.uid,
            email: user.email,
          })
        );
      }
    });
  }, []);

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
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BodyContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
