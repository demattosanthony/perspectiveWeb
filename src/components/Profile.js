import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "../axios";
import {
  selectUserId,
  setUserInfo,
  selectProfileImg,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";

function Profile() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const profileImgUrl = useSelector(selectProfileImg);

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

  return (
    <Container>
      <ProfileImg>{profileImgUrl && <img src={profileImgUrl} />}</ProfileImg>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  margin-top: 100px;
  background-color: orange;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProfileImg = styled.div`
  height: 150px;
  width: 150px;
  margin-top: 15px;
  border-radius: 100px;
  overflow: hidden;

  img {
    height: 100%;
  }
`;
