import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import styled from "styled-components";
import {
  auth,
  appleSignInProvider,
  googleSignInProvider,
} from "../../firebase";
import { setUserLogin } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import axios from "../../axios";

import DividerWithText from "./DividerWithText";
import TextField from "../TextField";
import Logo from "./Logo";
import ForgotPasswordPopUp from "./ForgotPasswordPopUp";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showForgotPasswordPopUp, setShowForgotPasswordPopUp] = useState(false);

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      let user = result.user;

      dispatch(
        setUserLogin({
          userId: user.uid,
          email: user.email,
        })
      );
      history.push("/");
    });
  };

  const appleSignIn = async () => {
    auth.signInWithPopup(appleSignInProvider).then(async (result) => {
      let user = result.user;

      const req = await axios.get(`checkUserExists/${user.email}`);
      // If they are not a user yet, sign them up
      if (req.data === false) {
        console.log("not a user");
        const newUser = {
          userId: user.uid,
          username: user.uid,
          name: user.displayName,
          email: user.email,
          profileImgUrl: user.photoURL,
        };
        await axios.post(`adduser`, newUser);
      } else {
        console.log("already a user");
      }

      dispatch(
        setUserLogin({
          userId: user.uid,
          email: user.email,
        })
      );
      history.push("/");
    });
  };

  const googleSignIn = async () => {
    auth.signInWithPopup(googleSignInProvider).then(async (result) => {
      console.log(result);
      let user = result.user;
      console.log(user);

      const req = await axios.get(`checkUserExists/${user.email}`);
      // If they are not a user yet, sign them up
      if (req.data === false) {
        const newUser = {
          userId: user.uid,
          username: user.uid,
          name: user.displayName,
          email: user.email,
          profileImgUrl: user.photoURL,
        };
        await axios.post(`adduser`, newUser);
      }
      dispatch(
        setUserLogin({
          userId: user.uid,
          email: user.email,
        })
      );
      history.push("/");
    });
  };

  return (
    <Container>
      <Card>
        <Logo />

        <Form>
          <TextField
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form>

        <ForgotPasswordBtn
          onClick={() => setShowForgotPasswordPopUp(!showForgotPasswordPopUp)}
        >
          Forgot Password?
        </ForgotPasswordBtn>

        <LoginButton onClick={signIn}>Login</LoginButton>

        <DividerWithText />

        <Link to={"/register"}>
          <RegisterButton>Register</RegisterButton>
        </Link>

        <AppleSignInButton onClick={appleSignIn}>
          <img src="appleSignIn.png" alt="" />
        </AppleSignInButton>

        <GoogleSignInButton onClick={googleSignIn}>
          <img src="googleSignIn.png" alt="" />
        </GoogleSignInButton>

        {showForgotPasswordPopUp && (
          <ForgotPasswordPopUp
            open={showForgotPasswordPopUp}
            handleClose={() =>
              setShowForgotPasswordPopUp(!showForgotPasswordPopUp)
            }
          />
        )}
      </Card>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;

  @media (max-width: 468px) {
    justify-content: start;
  }
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: white;
  /* margin-top: 70px; */
  border-radius: 10px;
  width: 50%;
  border: solid #bdbdbd 1px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 1100px) {
    width: 60%;

    @media (max-width: 768px) {
      width: 70%;
    }

    @media (max-width: 568px) {
      width: 90%;
    }
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ForgotPasswordBtn = styled.div`
  margin-left: 230px;
  color: #438afe;
  padding: 3px;
  transition: all 20ms;
  font-size: 14px;
  border-radius: 4px;

  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
`;

const LoginButton = styled.button`
  background-color: #438afe;
  color: white;
  font-size: 16px;
  border: none;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 250ms;
  width: 200px;
  height: 35px;

  &:hover {
    transform: scale(1.08);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const RegisterButton = styled(LoginButton)`
  margin-bottom: 10px;
`;

const AppleSignInButton = styled.div`
  /* height: 65px; */
  width: 200px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 250ms;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.08);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const GoogleSignInButton = styled(AppleSignInButton)`
  margin-bottom: 40px;
`;
