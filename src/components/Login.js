import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { auth } from "../firebase";
import { setUserLogin } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

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

  return (
    <Container>
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
    </Container>
  );
}

export default Login;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
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

    @media (max-width: 768px) {
      font-size: 60px;
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
`;

const PasswordTextField = styled(EmailTextField)``;

const LoginButton = styled.button`
  background-color: #438afe;
  color: white;
  font-size: 18px;
  border: none;
  padding: 10px;
  border-radius: 4px;
  margin-top: 40px;
  cursor: pointer;
  transition: all 250ms;

  &:hover {
    transform: scale(1.08);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
