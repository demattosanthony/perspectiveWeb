import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "../axios";
import {
  selectUserId,
  setUserInfo,
  selectProfileImg,
  selectName,
  selectUsername,
  setSignOut,
} from "../features/user/userSlice";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(selectUserId);
  const profileImgUrl = useSelector(selectProfileImg);
  const name = useSelector(selectName);
  const username = useSelector(selectUsername);

  useEffect(() => {
    if (auth.currentUser) {
      async function fetchData() {
        const request = await axios.get(`getUserInfo/${auth.currentUser.uid}`);
        const data = request.data[0];

        dispatch(
          setUserInfo({
            userId: data.user_id,
            name: data.name,
            email: data.email,
            username: data.username,
            profileImgUrl: data.profile_img_url,
          })
        );
      }
      fetchData();
    }
  }, [auth.currentUser]);

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/login");
    });
  };

  return (
    <Container>
      <ProfileImg>{profileImgUrl && <img src={profileImgUrl} />}</ProfileImg>

      <NameContainer>{name}</NameContainer>
      <UsernameContainer>@{username}</UsernameContainer>

      <MyAccountBtn>My Account</MyAccountBtn>

      <SettingsBtn>Settings</SettingsBtn>

      <LogOutBtn onClick={signOut}>Log Out</LogOutBtn>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  /* background-color: orange; */
  width: 300px;
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
