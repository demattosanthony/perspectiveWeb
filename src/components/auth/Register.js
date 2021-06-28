import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { auth, storageRef } from "../../firebase";
import axios from "../../axios";

import Logo from "./Logo";
import TextField from "../TextField";
import UploadImage from "../UploadImage";

function Register() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localProfileImgUrl, setLocalProfileImgUrl] = useState("");
  const [profileImgFile, setProfileImgFile] = useState("");
  // const [profileImgUrl, setProfileImgUrl] = useState("");

  const uploadProfileImg = async () => {
    if (profileImgFile !== "") {
      await storageRef
        .child(`user_profile_images/${profileImgFile.name}`)
        .put(profileImgFile);
      var downloadUrl = await storageRef
        .child(`user_profile_images/${profileImgFile.name}`)
        .getDownloadURL();
      return downloadUrl;
    } else {
      return "";
    }
  };

  const signUp = async (url) => {
    console.log(url);
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        let user = result.user;

        const newUser = {
          userId: user.uid,
          username: username,
          name: name,
          email: email,
          profileImgUrl: url,
        };
        await axios.post(`addUser`, newUser);

        await auth.signInWithEmailAndPassword(email, password);

        history.push("/");
      });
  };

  return (
    <Container>
      <Card>
        <Logo />
        <ProfileImage>
          {localProfileImgUrl !== "" ? (
            <img src={localProfileImgUrl} alt="" />
          ) : (
            <img src="profile_icon.png" alt="" />
          )}

          <Upload>
            <UploadImage
              setProfileImgUrl={setLocalProfileImgUrl}
              setProfileImgFile={setProfileImgFile}
            />
          </Upload>
        </ProfileImage>

        <TextField
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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

        <RegisterButton
          onClick={async () => {
            var url = await uploadProfileImg();
            await signUp(url);
          }}
        >
          Register
        </RegisterButton>
      </Card>
    </Container>
  );
}

export default Register;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
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

const ProfileImage = styled.div`
  height: 110px;
  width: 115px;
  position: relative;
  margin-bottom: 20px;

  img {
    height: 100px;
    width: 100px;
    border-radius: 100px;
  }
`;

const Upload = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const RegisterButton = styled.button`
  background-color: #438afe;
  color: white;
  font-size: 16px;
  border: none;
  padding: 10px;
  border-radius: 4px;
  margin-top: 30px;
  cursor: pointer;
  transition: all 250ms;
  width: 200px;
  height: 35px;
  margin-bottom: 40px;

  &:hover {
    transform: scale(1.08);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
