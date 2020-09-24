import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Login from './LoginElement/LoginElement';
import Signup from './SignupElement/SignupElement';
import googleSignIn, { signOut } from "./ProtectorManager";
const Protector = () => {
    const [newUser, setNewUser] = useState();
    const handleForSetUser = () => {
        setNewUser(!newUser)
    }
    const [user, setUser] = useState({
        name: '',
        email: '',
        photo: '',
        isSignIn: false,
        error: '',
    })

    const handleForGoogleSignIn = () => {
        googleSignIn().then(res => {
            setUser(res)
        })
    }
    const handleForSignOut = () => {
        signOut().then(res => {
            setUser(res)
        })
    }

    const style = {
        mainDiv: {
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            marginTop: "80px",  
        },
        div2: {
            border: '2px solid lightGray',
            padding: '30px',
            borderRadius:'10px'
        }
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
              <Login
                handleForSetUser={handleForSetUser}
                user={[user, setUser]}
              ></Login>
            ) : (
              <Signup
                handleForSetUser={handleForSetUser}
                user={[user, setUser]}
              ></Signup>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleForGoogleSignIn}
            >
              Continue with google
            </Button>
            <br />
            <br />
            <Button variant="contained" color="primary">
              Continue with facebook
            </Button>
          </div>
        )}
      </div>
    );
};

export default Protector;