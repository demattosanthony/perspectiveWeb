import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({ open, handleClose, title }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#438afe" }}>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
