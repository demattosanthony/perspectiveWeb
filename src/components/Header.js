import React, { useState } from "react";
import styled from "styled-components";

import CreateAlbumDialog from "./CreateAlbumDialog";

function Header() {
  const [showCreateAlbumDialog, setShowCreateAlbumDialog] = useState(false);

  return (
    <Container>
      <Logo>
        <img src="/app_logo.png" alt="" />
        <h1>Perspective Albums</h1>
      </Logo>

      <CreateAlbumBtn onClick={() => setShowCreateAlbumDialog(true)}>
        Create Album +
      </CreateAlbumBtn>

      {showCreateAlbumDialog && (
        <CreateAlbumDialog
          open={showCreateAlbumDialog}
          handleClose={() => setShowCreateAlbumDialog(!showCreateAlbumDialog)}
        />
      )}
    </Container>
  );
}

export default Header;

const Container = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  right: 0;
  left: 0;
`;

const Logo = styled.div`
  padding: 4px 10px;
  display: flex;
  align-items: center;

  img {
    height: 50px;
    width: 50px;
  }

  h1 {
    font-family: "Billabong2";
    font-size: 32px;
    font-weight: 100;
    margin-left: 10px;
  }
`;

const CreateAlbumBtn = styled.div`
  height: 40px;
  width: 200px;
  background-color: #438afe;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-right: 25px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all 250ms;

  &:hover {
    transform: scale(1.06);
    border-color: rgba(249, 249, 249, 0.8);
  }

  @media (max-width: 425px) {
    font-size: 14px;
  }
`;
