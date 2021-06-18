import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { auth, appleSignInProvider, googleSignInProvider } from "../firebase";
import { setUserLogin } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

import DividerWithText from "./DividerWithText";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const appleSignIn = () => {
    auth.signInWithPopup(appleSignInProvider).then((result) => {
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

  const googleSignIn = () => {
    auth.signInWithPopup(googleSignInProvider).then((result) => {
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

  return (
    <Container>
      <Card>
        <Logo>
          <img src="/app_logo.png" />
          <h1>Perspective Albums</h1>
        </Logo>

        <Form>
          <EmailTextField
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordTextField
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form>

        <LoginButton onClick={signIn}>Login</LoginButton>

        <DividerWithText />

        <RegisterButton>Register</RegisterButton>

        <AppleSignInButton onClick={appleSignIn}>
          <img src="appleSignIn.png" alt="" />
        </AppleSignInButton>

        <GoogleSignInButton onClick={googleSignIn}>
          <img src="googleSignIn.png" alt="" />
        </GoogleSignInButton>

        {/* <FacebookSignInButton>
          <img src="facebookSignIn.png" alt="" />
        </FacebookSignInButton> */}
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
    width: 70%;

    @media (max-width: 568px) {
      width: 90%;
    }
  }
`;

const Logo = styled.div`
  /* margin-top: 100px; */
  max-width: 650px;
  height: 200px;
  display: flex;
  align-items: center;

  img {
    height: 75px;
    width: 75;
    padding: 0px 30px;
  }

  h1 {
    font-family: "Billabong2";
    font-size: 75px;
    font-weight: 100;
  }
  @media (max-width: 1200px) {
    h1 {
      font-size: 65px;
    }
    @media (max-width: 768px) {
      h1 {
        font-size: 55px;
      }

      @media (max-width: 630px) {
        font-size: 50px;

        img {
          height: 60px;
          width: 60px;
          padding: 0px 30px;
        }
        h1 {
          font-size: 50px;
        }
      }
    }
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const EmailTextField = styled.input`
  width: 350px;
  padding: 5px;
  margin: 10px;
  font-size: 18px;
  border-radius: 6px;
  border: 1px solid #d3d3d3;

  @media (max-width: 900px) {
    width: 300px;

    @media (max-width: 768px) {
      width: 250px;
    }

    @media (max-width: 560px) {
      width: 200px;
    }
  }
`;

const PasswordTextField = styled(EmailTextField)``;

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
const FacebookSignInButton = styled(AppleSignInButton)`
  margin-bottom: 30px;
`;
