import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { createNewUser } from '../ProtectorManager';

const Signup = (props) => {
    const [user, setUser] = props.user;
    const [firstName, setFirstName] = useState('');
  const [showPas, setShowPas] = useState(false);
  
    let fieldValidation = true;
     const handleOnBlur = (e) => {
         if (e.target.name === "fName") {
            setFirstName(e.target.value);
         }
         if (e.target.name === "lName") {
            const userInfo = {...user}
            userInfo.name = `${firstName} ${e.target.value}`
            setUser(userInfo)
         }
         if (e.target.name === "email") {
             fieldValidation = /\S+@\S+\.\S+/.test(e.target.value);
         }
         if (e.target.name === "password") {
             const isPassHaveNum = /[0-9]/.test(e.target.value);
             const passLength = e.target.value.length > 6;
             fieldValidation = isPassHaveNum && passLength;
             if (!fieldValidation) {
                 const userInfo = { ...user }
                 userInfo.error ="Password must have one number and \n length must be more than six."
                 setUser(userInfo)
             }
         }
         if (e.target.name === "rePassword") {
             if (user.password !== e.target.value) {
                fieldValidation = false;
                const userInfo = { ...user };
                userInfo.error = "Password don't match \n with previous one.";
                setUser(userInfo);
             }
         }
         if (fieldValidation) {
             const userInfo = { ...user };
             userInfo.error = '';
             userInfo[e.target.name] = e.target.value;
             setUser(userInfo)
         }
    };
 
    
    const handleOnSubmit = (e) => {
      createNewUser(user.email, user.password, user.name)
        .then(res => {
          const userDetail = { ...res }
          userDetail.displayName = user.name
          setUser(userDetail)
        })
        e.preventDefault();
    };
    
   

    return (
      <div>
        <form onSubmit={handleOnSubmit}>
          <TextField
            onBlur={handleOnBlur}
            placeholder="First Name"
            name="fName"
            type="text"
            required
          ></TextField>
          <br /> <br />
          <TextField
            onBlur={handleOnBlur}
            placeholder="Last Name"
            name="lName"
            type="text"
            required
          ></TextField>
          <br /> <br />
          <TextField
            onBlur={handleOnBlur}
            placeholder="Email"
            name="email"
            required
          ></TextField>
          <br/><br/>
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
          <br />
          <div>
            <TextField
              onBlur={handleOnBlur}
              placeholder="Re type password"
              name="rePassword"
              type={showPas ? "text" : "password"}
              required
            ></TextField>
            <Button onClick={() => setShowPas(!showPas)}>
              {showPas ? "hide" : "show"}
            </Button>
          </div>
          <br />
          <span style={{ color: "red" }}>{user.error}</span>
          <Button variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
        </form>
        <p>
          All-ready have an account? |{" "}
          <span onClick={props.handleForSetUser} style={{ color: "blue" }}>
            Login
          </span>
        </p>
      </div>
    );
};

export default Signup;