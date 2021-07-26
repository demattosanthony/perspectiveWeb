import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

function ShareDialog({ open, handleClose }) {
  const [showSnackBar, setShowSnackBar] = useState(false);

  return (
    <Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Share This Link</DialogTitle>
        <DialogContent style={{ width: "450px" }}>
          <ShareLink
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setShowSnackBar(true);
            }}
          >
            {window.location.href}
          </ShareLink>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="#438afe">
            OK
          </Button>
        </DialogActions>
        {showSnackBar && (
          <Snackbar open={showSnackBar} autoHideDuration={6000}>
            <Alert onClose={() => setShowSnackBar(false)} severity="success">
              Copied To Clipboard!
            </Alert>
          </Snackbar>
        )}
      </Dialog>
    </Container>
  );
}

export default ShareDialog;

const Container = styled.div`
  position: fixed;
  z-index: 1;
  width: 1000px;
`;

const ShareLink = styled.div`
  cursor: pointer;
  background-color: #d3d3d3;
  padding: 8px;
  border-radius: 4px;
  width: fit-content;
  /* overflow-x: scroll; */
`;
