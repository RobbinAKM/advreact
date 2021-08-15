import React, { useState, useReducer, useEffect } from "react";
import SimpleModal from "./Modal";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
//import ImageIcon from "@material-ui/icons/Image";

function App() {
  return (
    <div>
      <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
        welcome
      </Typography>
      <h3 style={{ margin: "20px" }}>list Name</h3>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <img src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
      </List>
      <SimpleModal />
    </div>
  );
}

export default App;
