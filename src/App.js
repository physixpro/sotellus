import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Quotes from "./components/Quotes";
import "./App.css";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  logoutButton: {
    display: "block",
    margin: "3em 1em 0auto",
  },
});

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "123",
  };

  const classes = useStyles();

  const [user, setUser] = useState({ email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    if (
      details.email == adminUser.email &&
      details.password == adminUser.password
    ) {
      setUser({
        email: details.email,
      });
    } else {
      setError("Details do not match!");
    }
  };

  const Logout = () => {
    setUser({ email: "" });
  };

  return (
    <div className="App">
      {user.email != "" ? (
        <div className="welcome">
        
          <Quotes Logout={Logout}/>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
