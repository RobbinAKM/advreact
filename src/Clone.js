import React, { useState, useReducer, useEffect } from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "./aws-exports";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listLists } from "./graphql/queries";
import { deleteList } from "./graphql/mutations";
import { onCreateList, onDeleteList } from "./graphql/subscriptions";

import SimpleModal from "./Modal";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/Edit";

Amplify.configure(awsConfig);

function App() {
  const [lists, setList] = useState([]);
  const [newLists, setNewList] = useState("");

  //to get all the lists from database via API call
  async function fetch() {
    var { data } = await API.graphql(graphqlOperation(listLists));
    setList(data.listLists.items);
  }

  //to delete in data base via API call
  async function deleteListById(id) {
    var result = await API.graphql(
      graphqlOperation(deleteList, { input: { id } })
    );
  }

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    setList([newLists, ...lists]);
  }, [newLists]);

  //helper function to add in state instantly
  function addToList({ data }) {
    setNewList(data.onCreateList);
  }

  //helper function to delete in state instantly
  function deleteFromList({ data }) {
    var undeletedLists = lists.filter(
      (item) => item.id !== data.onDeleteList.id
    );
    setList(undeletedLists);
  }

  //for subscription
  useEffect(() => {
    var addSubscription = API.graphql(graphqlOperation(onCreateList)).subscribe(
      {
        next: ({ provider, value }) => addToList(value),
      }
    );
    var deleteSubscription = API.graphql(
      graphqlOperation(onDeleteList)
    ).subscribe({
      next: ({ provider, value }) => deleteFromList(value),
    });

    return () => {
      addSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, []);

  return (
    <AmplifyAuthenticator>
      <div>
        <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
          welcome
        </Typography>
        <h3 style={{ margin: "20px" }}>list Name</h3>
        {lists.map((item) => (
          <List>
            <ListItem>
              <DeleteOutlinedIcon onClick={() => deleteListById(item.id)} />
              <EditIcon
                style={{ margin: "20px" }}
                onClick={() => alert("there")}
              />
              <ListItemAvatar>
                <Avatar>
                  <img src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.title} secondary={item.description} />
            </ListItem>
          </List>
        ))}
        <SimpleModal />
      </div>
      <AmplifySignOut />
    </AmplifyAuthenticator>
  );
}

export default App;
