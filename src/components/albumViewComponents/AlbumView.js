import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import AlbumHeader from "./AlbumHeader";
import { useQuery } from "react-query";
import axios from "../../axios";
import { Link } from "react-router-dom";

function AlbumView() {
  const { albumId, title } = useParams();

  const { data, status } = useQuery(`getImages${albumId}`, async () => {
    const request = await axios.get(`getImages/${albumId}`);
    return request.data;
  });

  return (
    <Container>
      <AlbumHeader title={title} />

      <ImagesGrid>
        {status === "success" &&
          data.map((image) => (
            <Link to={{ pathname: `/image`, state: { url: image.photo_url } }}>
              <ImageContainer>
                <img src={image.photo_url} alt="" />
              </ImageContainer>
            </Link>
          ))}
      </ImagesGrid>
    </Container>
  );
}

export default AlbumView;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  justify-items: center;

  @media (max-width: 805px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));

    @media (max-width: 610px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
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

const ImageContainer = styled.div`
  height: 200px;
  width: 200px;
  overflow: hidden;
  cursor: pointer;
  margin: 2px;
  overflow: hidden;
  padding: 2px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    background: url(https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif)
      no-repeat center;
  }

  @media (max-width: 610px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    height: 150px;
    width: 150px;
  }
`;
