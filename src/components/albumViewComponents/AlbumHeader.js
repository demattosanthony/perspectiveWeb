import React, { useState } from "react";
import styled from "styled-components";

import { GoogleDriveBtn } from "../../styles/buttons";
import UploadImagesButton from "./UploadImagesButton";
import ShareDialog from "./ShareDialog";

function AlbumHeader({ title }) {
  const [showShareDialog, setShareDialog] = useState(false);

  return (
    <Container>
      <Title>{title}</Title>

      <ButtonsContainer>
        <GoogleDriveBtn
          height="35px"
          width="70px"
          fontSize="16px"
          onClick={() => setShareDialog(true)}
        >
          Share
        </GoogleDriveBtn>

        <UploadImagesButton />
      </ButtonsContainer>

      {showShareDialog && (
        <ShareDialog
          open={showShareDialog}
          handleClose={() => setShareDialog(false)}
        />
      )}
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
