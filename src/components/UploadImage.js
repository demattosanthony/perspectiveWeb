import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

export default function UploadButtons({ setProfileImgUrl, setProfileImgFile }) {
  const classes = useStyles();
  const fileInput = React.createRef();

  const uploadFile = (file) => {
    setProfileImgUrl(URL.createObjectURL(file));
    setProfileImgFile(file);
  };

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        ref={fileInput}
        onChange={() => uploadFile(fileInput.current.files[0])}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          aria-label="upload picture"
          component="span"
          style={{
            backgroundColor: "lightgray",
            height: "20px",
            width: "20px",
          }}
        >
          <PhotoCamera style={{ color: "#438afe" }} />
        </IconButton>
      </label>
    </div>
  );
}
