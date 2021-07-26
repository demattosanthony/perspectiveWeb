import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import AlbumHeader from "./AlbumHeader";
import { useQuery } from "react-query";
import axios from "../../axios";
import { Link } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectLoading, setAlbumId } from "../../features/album/albumSlice";
import { joinAlbum } from "../../services/firestoreService";
import UploadImagesButton from "./UploadImagesButton";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../styles/theme";

function AlbumView() {
  const dispatch = useDispatch();
  const { albumId, title } = useParams();
  const loading = useSelector(selectLoading);

  const { data, status } = useQuery(`getImages${albumId}`, async () => {
    const request = await axios.get(`getImages/${albumId}`);
    return request.data;
  });

  useEffect(() => {
    joinAlbum(albumId);
    dispatch(setAlbumId({ albumId: albumId }));
  }, [albumId, dispatch]);

  return (
    <Container>
      {loading && (
        <MuiThemeProvider theme={theme}>
          <LinearProgress />
        </MuiThemeProvider>
      )}

      <AlbumHeader title={title} />

      {status === "success" && data.length !== 0 ? (
        <ImagesGrid>
          {data.map((image) => (
            <Link to={{ pathname: `/image`, state: { url: image.photo_url } }}>
              <ImageContainer>
                <img src={image.photo_url} alt="" />
              </ImageContainer>
            </Link>
          ))}
        </ImagesGrid>
      ) : (
        <NoImages>
          No Images Uploaded :(
          <UploadImagesButton />
        </NoImages>
      )}
    </Container>
  );
}

export default AlbumView;

const Container = styled.div`
  /* height: 100vh;
  width: 100vw; */
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
  margin-top: 12px;
  overflow: hidden;
  padding: 2px;

  img {
    height: 100%;
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
    /* background: url(https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif)
      no-repeat center; */
  }

  @media (max-width: 610px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    height: 150px;
    width: 150px;
  }
`;

const NoImages = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
  font-size: 40px;
  font-family: "LeftistMonoSerif";

  input {
    display: none;
  }
`;
