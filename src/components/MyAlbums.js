import React from "react";
import styled from "styled-components";
import axios from "../axios";
import { useQuery } from "react-query";
import { auth } from "../firebase";

import PreviewAlbum from "./PreviewAlbum";

const fetchData = async () => {
  const request = await axios.get(`getUserAlbums/${auth.currentUser.uid}`);
  console.log(request.data);
  return request.data;
};

function MyAlbums() {
  const { data, status } = useQuery("getUserAlbums", fetchData);

  return (
    <Container>
      <Title>My Albums</Title>
      {status === "success" &&
        (data.length === 0 ? (
          <NoAlbums>You have not created or joined any albums </NoAlbums>
        ) : (
          <Content>
            {data.map((album) => (
              <PreviewAlbum
                key={album.album_id}
                title={album.title}
                albumId={album.album_id}
                profileImgUrl={album.profile_img_url}
              />
            ))}
          </Content>
        ))}
    </Container>
  );
}

export default MyAlbums;

const Container = styled.div`
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const Title = styled.div`
  /* margin-top: 100px; */
  font-size: 40px;
  font-weight: bold;
  font-family: "LeftistMonoSerif";
  letter-spacing: 2px;
`;

const NoAlbums = styled.div`
  margin-top: 25px;
  font-size: 22px;
  font-family: "LeftistMonoSerif";
`;

const Content = styled.div`
  margin-top: 20px;
  display: grid;
  grid-gap: 35px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  @media (min-width: 1900px) {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
`;
