import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useMutation, useQueryClient } from "react-query";
import axios from "../../axios";
import { auth } from "../../firebase";

const options = ["Delete"];

const ITEM_HEIGHT = 48;

export default function AlbumMenu({
  anchorEl,
  open,
  handleClose,
  userId,
  albumId,
  ownerId,
}) {
  const queryClient = useQueryClient();

  const deleteAlbumMutation = useMutation(
    (value) => axios.post(`deleteAlbum`, value),
    {
      onSuccess: () => queryClient.invalidateQueries("getUserAlbums"),
    }
  );
  return (
    <div>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              deleteAlbumMutation.mutate({
                isOwner: auth.currentUser.uid === ownerId ? "true" : "false",
                albumId: albumId,
                userId: auth.currentUser.uid,
              });
              handleClose();
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
