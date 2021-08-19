import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";

import { useS3 } from ".././hooks/useS3";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const UploadImage = () => {
  const classes = useStyles();
  const InputRef = useRef();
  const [uploadToS3] = useS3();

  const [image, setImage] = useState("");
  const [uploadFile, setUploadFIle] = useState("");

  function handleInputChange(e) {
    var fileToUpload = e.target.files[0];
    if (!fileToUpload) return;
    var imageUrl = URL.createObjectURL(fileToUpload);
    setImage(imageUrl);
    setUploadFIle(fileToUpload);
  }

  function saveImage() {
    uploadToS3(uploadFile);
    console.log(uploadFile);
  }

  return (
    <div>
      <img
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "5px",
          width: "150px",
        }}
        src={image}
      />
      <br />
      <input
        type="file"
        style={{ display: "none" }}
        ref={InputRef}
        onChange={handleInputChange}
      />
      <Button
        type="file"
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={() => InputRef.current.click()}
      >
        Upload Image
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={saveImage}
      >
        Save
      </Button>
    </div>
  );
};

export default UploadImage;
