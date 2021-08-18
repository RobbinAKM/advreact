import React, { useState, useReducer, useEffect } from "react";
import SimpleModal from "./Modal";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/Edit";
//import ImageIcon from "@material-ui/icons/Image";
import UploadImage from "./ImageHandler/UploadImage";

function App() {
  return (
    <div>
      <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
        welcome
      </Typography>
      <h3 style={{ margin: "20px" }}>list Name</h3>
      <List>
        <ListItem>
          <DeleteOutlinedIcon onClick={() => alert("hi")} />
          <EditIcon style={{ margin: "20px" }} onClick={() => alert("there")} />
          <ListItemAvatar>
            <Avatar>
              <img src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
      </List>
      <SimpleModal />
      <br />
      <UploadImage />
    </div>
  );
}

export default App;
