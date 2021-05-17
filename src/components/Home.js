import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Profile from "./Profile";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSignOut, setUserLogin } from "../features/user/userSlice";

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        history.push("/login");
      } else {
        // console.log(user);
        dispatch(
          setUserLogin({
            userId: user.uid,
            email: user.email,
          })
        );
      }
    });
  }, []);

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/login");
    });
  };

  return (
    <Container>
      <Header />

      <BodyContainer>
        <Profile />
        <button onClick={signOut}>Sign Out</button>
      </BodyContainer>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  height: 100vh;

  button {
    margin-top: 15vh;
    margin-left: 500px;
  }
`;

const BodyContainer = styled.div`
  display: flex;
  height: 100%;

  button {
    height: 50px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
