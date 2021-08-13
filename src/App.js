import React, { useState, useReducer, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "./aws-exports";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listLists } from "./graphql/queries";

Amplify.configure(awsConfig);

const Checkbox = ({ children }) => {
  const [checked, setCheck] = useState(true);
  return React.Children.map(children, (child) => {
    const clone = React.cloneElement(child, {
      checked,
      setCheck,
    });
    return clone;
  });
};

const Label = ({ children, setCheck }) => {
  return (
    <h1
      onClick={() => {
        setCheck((state) => !state);
      }}
    >
      {children}
    </h1>
  );
};

const Input = ({ setCheck, checked }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => {
        setCheck(e.target.checked);
      }}
    />
  );
};

function App() {
  const [lists, setList] = useState([]);
  async function fetch() {
    var { data } = await API.graphql(graphqlOperation(listLists));
    setList(data.listLists.items);
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <AmplifyAuthenticator>
      <div className="App">
        <Checkbox>
          <Label>Welcome</Label>
          <Input />
        </Checkbox>
        <ul>
          {lists.map((item) => (
            <li>{item.title}</li>
          ))}
        </ul>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;
