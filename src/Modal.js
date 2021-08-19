import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { createList } from "./graphql/mutations";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "./aws-exports";
import { listLists } from "./graphql/queries";

import UploadImage from "./ImageHandler/UploadImage";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const initialState = {
  title: "",
  description: "",
};
const changeValue = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_TITLE":
      return { ...state, title: action.value };
    case "CHANGE_DESCRIPTION":
      return { ...state, description: action.value };
    default:
      return state;
  }
};

const SimpleModal = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [state, dispatch] = useReducer(changeValue, initialState);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function saveLists() {
    var { title, description } = state;
    var result = await API.graphql(
      graphqlOperation(createList, { input: { title, description } })
    );
    setOpen(false);
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form>
        <TextField
          id=""
          label="title"
          value={state.title}
          onChange={(e) =>
            dispatch({ type: "CHANGE_TITLE", value: e.target.value })
          }
        />
        <br />
        <TextField
          id=""
          label="description"
          value={state.description}
          onChange={(e) =>
            dispatch({ type: "CHANGE_DESCRIPTION", value: e.target.value })
          }
        />
      </form>
      <div style={{ margin: "20px" }}>
        <button style={{ marginRight: "20px" }} onClick={saveLists}>
          save
        </button>
        <button onClick={() => setOpen(false)}>cancel</button>
      </div>
      <UploadImage />
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Add List
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default SimpleModal;
