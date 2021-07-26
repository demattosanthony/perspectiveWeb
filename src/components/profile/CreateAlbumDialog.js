import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../styles/theme";

import { useQueryClient, useMutation } from "react-query";
import axios from "../../axios";
import { auth } from "../../firebase";

function CreateAlbumDialog({ open, handleClose }) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");

  const createAlbumMutation = useMutation(
    (value) => axios.post(`createAlbum`, value),
    {
      onSuccess: () => queryClient.invalidateQueries("getUserAlbums"),
    }
  );

  return (
    <Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter Album Title</DialogTitle>
        <DialogContent>
          <MuiThemeProvider theme={theme}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Album Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </MuiThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              createAlbumMutation.mutate({
                title: title,
                userid: auth.currentUser.uid,
              });
              handleClose();
            }}
            disabled={title === ""}
            color="#438afe"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CreateAlbumDialog;

const Container = styled.div`
  position: fixed;
  z-index: 1;
`;
