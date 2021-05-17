import React from "react";
import styled from "styled-components";
import axios from "../axios";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { useQuery } from "react-query";

const fetchData = async () => {
  const request = await axios.get(`getUserInfo/${auth.currentUser.uid}`);
  const data = request.data[0];
  return data;
};

function Profile() {
  const { data, status } = useQuery("userInfo", fetchData);
  const history = useHistory();

  const signOut = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  return (
    <Container>
      {status === "success" && (
        <>
          <ProfileImg>
            <img src={data.profile_img_url} />
          </ProfileImg>
          <NameContainer>{data.name}</NameContainer>
          <UsernameContainer>@{data.username}</UsernameContainer>
          <MyAccountBtn>My Account</MyAccountBtn>
          <SettingsBtn>Settings</SettingsBtn>
          <LogOutBtn onClick={signOut}>Log Out</LogOutBtn>
        </>
      )}
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  /* background-color: orange; */
  width: 275px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 525px;
  }
`;

const ProfileImg = styled.div`
  height: 150px;
  width: 150px;
  margin-top: 100px;
  border-radius: 100px;
  overflow: hidden;

  img {
    height: 100%;
  }
`;

const NameContainer = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const UsernameContainer = styled.div`
  padding: 5px;
  color: #808080;
`;

const MyAccountBtn = styled.div`
  height: 20px;
  width: 110px;
  margin-top: 30px;
  padding: 10px;
  border-radius: 25px;
  border: 1px solid;
  border-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 5px 4px 15px 5px rgba(0, 0, 0, 0.11);
  box-shadow: 5px 4px 15px 5px rgba(0, 0, 0, 0.11);
  cursor: pointer;
  transform: all 250ms;

  &:hover {
    transform: scale(1.06);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const SettingsBtn = styled(MyAccountBtn)``;

const LogOutBtn = styled(MyAccountBtn)``;
