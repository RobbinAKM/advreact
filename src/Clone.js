import React, { useState, useReducer, useEffect } from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "./aws-exports";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listLists } from "./graphql/queries";
import { onCreateList } from "./graphql/subscriptions";

import SimpleModal from "./Modal";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

Amplify.configure(awsConfig);

function App() {
  const [lists, setList] = useState([]);
  const [newLists, setNewList] = useState("");
  async function fetch() {
    var { data } = await API.graphql(graphqlOperation(listLists));
    setList(data.listLists.items);
  }
  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    setList([newLists, ...lists]);
  }, [newLists]);

  function addToList({ data }) {
    setNewList(data.onCreateList);
  }

  useEffect(() => {
    var subscription = API.graphql(graphqlOperation(onCreateList)).subscribe({
      next: ({ provider, value }) => addToList(value),
    });
  }, []);

  return (
    <AmplifyAuthenticator>
      <div>
        <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
          welcome
        </Typography>
        {lists.map((item) => (
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <img src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.title} secondary={item.description} />
            </ListItem>
          </List>
        ))}
        <h3 style={{ margin: "20px" }}>list Name</h3>

        <SimpleModal />
      </div>
      <AmplifySignOut />
    </AmplifyAuthenticator>
  );
}

export default App;
