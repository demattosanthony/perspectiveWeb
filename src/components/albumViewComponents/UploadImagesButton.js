import React, { createRef } from "react";
import styled from "styled-components";
import { auth } from "../../firebase";
import { useQueryClient } from "react-query";
import axios from "../../axios";
import { selectAlbumId, setLoading } from "../../features/album/albumSlice";
import { useDispatch, useSelector } from "react-redux";

import { uploadImage } from "../../services/albumService";
import { GoogleDriveBtn } from "../../styles/buttons";

function UploadImagesButton() {
  const dispatch = useDispatch();
  const albumId = useSelector(selectAlbumId);
  const fileInput = createRef();
  const queryCache = useQueryClient();

  const handleClick = (event) => {
    fileInput.current.click();
  };

  const handleChange = async (event) => {
    event.preventDefault();
    dispatch(setLoading({ loading: true }));
    for (var i = 0; i < event.target.files.length; i++) {
      var downloadUrl = await uploadImage(albumId, event.target.files[i]);
      const res = await axios.post(`uploadImageUrl`, {
        photourl: downloadUrl,
        albumid: albumId,
        userId: auth.currentUser.uid,
      });
      if (res.status === 200) {
        queryCache.invalidateQueries(`getImages${albumId}`);
      } else {
        console.log("Could not upload image");
      }
    }
    dispatch(setLoading({ loading: false }));
  };

  return (
    <div>
      <InputContainer
        accept="image/*"
        multiple
        id="icon-button-file"
        type="file"
        ref={fileInput}
        onChange={handleChange}
      />
      <label htmlFor="icon-button-file">
        <GoogleDriveBtn
          width="150px"
          height="35px"
          fontSize="16px"
          onClick={handleClick}
        >
          Upload Images
        </GoogleDriveBtn>
      </label>
    </div>
  );
}

export default UploadImagesButton;

const InputContainer = styled.input`
  display: none;
`;
