import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Storage } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const UploadImage = () => {
  const classes = useStyles();
  const InputRef = useRef();

  const [image, setImage] = useState(
    "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270"
  );

  const [filename, setFilename] = useState("");

  useEffect(() => {
    if (!filename) return;
    const [file, extension] = filename.name.split(".");
    const type = filename.type;
    const key = `images/lists/${file}.${extension}`;
    const result = Storage.put(key, filename, {
      contentType: type,
      metadata: {
        app: "adv-react",
      },
    });
    console.log(result);
  }, [filename]);

  function handleInputChange(e) {
    var fileToUpload = e.target.files[0];
    if (!fileToUpload) return;
    var imageUrl = URL.createObjectURL(fileToUpload);
    setImage(imageUrl);
    setFilename(fileToUpload);
  }

  return (
    <div>
      <img size="small" src={image} />
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
        Upload
      </Button>
    </div>
  );
};

export default UploadImage;
