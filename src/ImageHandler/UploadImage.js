import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import { createList } from ".././graphql/mutations";

import { useS3 } from ".././hooks/useS3";

import Amplify, { API, graphqlOperation } from "aws-amplify";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const UploadImage = ({ close, title, description }) => {
  const classes = useStyles();
  const InputRef = useRef();
  const [uploadToS3] = useS3();

  const [displayImage, setdisplayImage] = useState("");
  const [uploadFile, setUploadFIle] = useState("");

  function handleInputChange(e) {
    var fileToUpload = e.target.files[0];
    if (!fileToUpload) return;
    var imageUrl = URL.createObjectURL(fileToUpload);
    setdisplayImage(imageUrl);
    setUploadFIle(fileToUpload);
  }

  function saveImage() {
    var imageKey = uploadToS3(uploadFile);
    close();
    return imageKey;
  }

  async function saveLists() {
    var image = await saveImage();
    var imageKey = `https://advreactb593f4afe5d84a3b8d31f8d241ddc59694013-dev.s3.amazonaws.com/public/${image}`;
    var result = await API.graphql(
      graphqlOperation(createList, { input: { title, description, imageKey } })
    );
    close();
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
        src={displayImage}
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
        onClick={saveLists}
      >
        Save
      </Button>
    </div>
  );
};

export default UploadImage;
