import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { signIn } from '../ProtectorManager';

const Login = (props) => {
  const [user, setUser] = props.user
  const [showPas, setShowPas] = useState(false);

  let fieldValidation = true;
  const handleOnBlur = (e) => {
    if (e.target.name === "email") {
      fieldValidation = /\S+@\S+\.\S+/.test(e.target.value);
    } if(!fieldValidation){
       const userInfo = { ...user };
       userInfo.error ="Please insert valid email";
       setUser(userInfo);
    }
     if (fieldValidation) {
       const userInfo = { ...user };
       userInfo.error = "";
       userInfo[e.target.name] = e.target.value;
       setUser(userInfo);
     }
  }
 
  const handleSubmit = (e) => {
    if (user.email && user.password) {
      signIn(user.email, user.password).then((res) => {
        setUser(res);
      });
   }
    e.preventDefault();
  }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="User name or email"
            name="email"
            type="text"
            onBlur={handleOnBlur}
          ></TextField>
          <br />
          <br />
          <div>
            <TextField
              onBlur={handleOnBlur}
              placeholder="Password"
              name="password"
              type={showPas ? "text" : "password"}
              required
            ></TextField>
            <Button onClick={() => setShowPas(!showPas)}>
              {showPas ? "hide" : "show"}
            </Button>
          </div>
          <p style={{ color: "red" }}>{user.error}</p>
          <Button variant="contained" color="primary" type="submit">
            Log in
          </Button>
        </form>
        <p>
          Don't have account? |
          <span onClick={props.handleForSetUser} style={{ color: "blue" }}>
            Create an account
          </span>
        </p>
      </div>
    );
};

export default Login;