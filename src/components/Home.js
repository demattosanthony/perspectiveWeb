import React, { useEffect } from "react";
import styled from "styled-components";
import Profile from "./Profile";
import MyAlbums from "./MyAlbums";
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

  return (
    <Container>
      <Profile />
      <MyAlbums />
    </Container>
  );
}

export default Home;

const Container = styled.div`
  height: 100vh;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

