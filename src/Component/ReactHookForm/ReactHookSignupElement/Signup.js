import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { createNewUser } from '../../Protector/ProtectorManager';

const Signup = (props) => {
  const [newUser, setNewUser] = props.newUser;
  const [user, setUser] = props.user;
     const { register, getValues, handleSubmit,errors } = useForm({mode:'onBlur'});
  
     const onSubmit = (data) => {
       const name = `${data.firstName} ${data.lastName}`
      console.log(data)
      //  createNewUser(data.email, data.password, name)
      //    .then(res => {
      //       setUser(res);
      //    });   
    }
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="First Name"
            name="firstName"
            inputRef={register({
              required: true,
            })}
          />
          <br />
         <p>
          {errors.firstName && (
            <span style={{ color: "red" }}>First Name is required.</span>
          )}</p>
          <TextField
            placeholder="Last Name"
            name="lastName"
            inputRef={register({
              required: true,
            })}
          />
          <br />
          <p>
          {errors.lastName && (
            <span style={{ color: "red" }}>Last Name is required.</span>
          )}</p>
          <TextField
            placeholder="Email"
            name="email"
            inputRef={register({
              required: "Email is required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address.",
              },
            })}
          />
          <br />
        <p>
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}</p>
          <TextField
            placeholder="Password"
            name="password"
            inputRef={register({
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password must be more than six character",
              },
              validate: (value) => {
                return (
                  [/[0-9]/, /[a-z]/, /[^a-zA-Z0-9]/].every((condition) =>
                    condition.test(value)
                  ) ||
                  "Password must contained lower case, number and special character"
                );
              },
            })}
          />
          <br />
          <p>
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password.message}</span>
            )} </p>
          <TextField
            placeholder="Re-type Password"
            name="reTypePassword"
            inputRef={register({
              required: "Re-type your password.",
              validate: {
                matchPreviousPass: (value) => {
                  const { password } = getValues();
                  return value === password || "Password don't match.";
                },
              },
            })}
          />
          <br />{" "}
          <p>
            {errors.reTypePassword && (
              <span style={{ color: "red" }}>
                {errors.reTypePassword.message}
              </span>
            )}
          </p>
          <span style={{ color: "red" }}>{user.error}</span>
          <Button variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
        </form>
        <p>
          All ready have an account|
          <span onClick={() => setNewUser(!newUser)} style={{ color: "blue" }}>
            Log in
          </span>
        </p>
      </div>
    );
};

export default Signup;