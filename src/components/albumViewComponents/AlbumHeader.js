import React from "react";
import styled from "styled-components";

import { GoogleDriveBtn } from "../../styles/buttons";
import UploadImagesButton from "./UploadImagesButton";

function AlbumHeader({ title }) {
  return (
    <Container>
      <Title>{title}</Title>

      <ButtonsContainer>
        <GoogleDriveBtn height="35px" width="70px">
          Share
        </GoogleDriveBtn>

        <UploadImagesButton />
      </ButtonsContainer>
    </Container>
  );
}

export default AlbumHeader;

const Container = styled.div`
  min-height: 70px;
  display: flex;
  align-items: center;

  justify-content: center;
  /* width: 100%; */
  top: 0;
  right: 0;
  left: 0;
`;
const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  font-family: "LeftistMonoSerif";
  letter-spacing: 2px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
`;
