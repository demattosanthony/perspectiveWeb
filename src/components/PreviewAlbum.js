import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "../axios";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import AlbumMenu from "./AlbumMenu";

function PreviewAlbum({ albumId, title, profileImgUrl, ownerId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, status } = useQuery(
    `getFirstAlbumImage/${albumId}`,
    async () => {
      const request = await axios.get(`getFirstAlbumImage/${albumId}`);
      console.log(request.data);
      return request.data;
    }
  );

  return (
    <Container>
      {status === "success" && (
        <>
          <Fade bottom>
            <Wrap>
              <Link to={`/album/${albumId}/${title}`}>
                <img
                  src={data === "" ? "/album_logo.jpg" : data.photo_url}
                  alt=""
                />
              </Link>

              <DescContainer>
                <TitleContainer>
                  <img src={profileImgUrl} alt="" />

                  {title}
                </TitleContainer>

                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>

                {open && (
                  <AlbumMenu
                    open={open}
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                    albumId={albumId}
                    ownerId={ownerId}
                  />
                )}
              </DescContainer>
            </Wrap>
          </Fade>
        </>
      )}
    </Container>
  );
}

export default PreviewAlbum;

const Container = styled.div``;

const Wrap = styled.div`
  width: 190px;
  height: 220px;
  /* background-color: red; */
  border-radius: 10px;
  overflow: hidden;
  -webkit-box-shadow: 5px 4px 15px 5px rgba(0, 0, 0, 0.11);
  box-shadow: 5px 4px 15px 5px rgba(0, 0, 0, 0.11);

  transition: all 250ms;

  img {
    cursor: pointer;
    width: 100%;
    height: 165px;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.06);
    border-color: rgba(249, 249, 249, 0.8);
  }

  a {
    text-decoration: none;
    color: black;
  }

  @media (max-width: 425px) {
    width: 150px;
    height: 185px;

    img {
      width: 100%;
      height: 130px;
      object-fit: cover;
    }
  }
`;

const DescContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  height: 45px;

  img {
    cursor: text;
    height: 35px;
    width: 35px;
    border-radius: 100px;
    margin: 5px;
    background: url(https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif)
      no-repeat center;
  }

  @media (max-width: 425px) {
    img {
      height: 30px;
      width: 30px;
    }
  }
`;
