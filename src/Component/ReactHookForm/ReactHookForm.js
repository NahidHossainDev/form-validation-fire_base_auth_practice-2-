import React, { useState } from 'react';
import Login from './ReactHookLoginElement/Login';
import Signup from './ReactHookSignupElement/Signup';
import { signOut } from '../Protector/ProtectorManager';
import { Button } from '@material-ui/core';


const ReactHookForm = () => {

    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
      name: "",
      email: "",
      photo: "",
      isSignIn: false,
      error: "",
    });
  
  const handleForSignOut = () => {
    signOut().then(res => setUser(res))
  }
     const style = {
       mainDiv: {
         display: "flex",
         justifyContent: "center",
         alignItem: "center",
         marginTop: "80px",
       },
       div2: {
         border: "2px solid lightGray",
         padding: "30px",
         borderRadius: "10px",
         width:'400px'
       },
     };
    return (
      <div style={style.mainDiv}>
        {user.isSignIn ? (
          <div style={style.div2}>
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <img
              src={user.photo}
              style={{ width: "100px", height: "100px" }}
              alt=""
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleForSignOut}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div style={style.div2}>
            {newUser ? (
              <Login newUser={[newUser, setNewUser]} user={[user, setUser]} />
            ) : (
              <Signup newUser={[newUser, setNewUser]} user={[user, setUser]} />
            )}
          </div>
        )}
      </div>
    );
};

export default ReactHookForm;