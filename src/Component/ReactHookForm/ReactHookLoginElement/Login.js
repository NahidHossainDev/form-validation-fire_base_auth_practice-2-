import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { signIn } from '../../Protector/ProtectorManager';
import { useForm } from 'react-hook-form';

const Login = (props) => {
  const [newUser, setNewUser] = props.user;
  const [user, setUser] = props.user;
  
  const { register, handleSubmit, error } = useForm();

  const onSubmit = (data) => {
       console.log(data)
       signIn(data.email, data.password).then((res) => {
         setUser(res);
         console.log(res)
       });
     };
  
    return (
      <div>
        <form onSubmit ={handleSubmit(onSubmit)}>
          <TextField placeholder='User name or Email' name='email' inputRef={register}/>
        <br /> <br />
        <TextField placeholder='Password' name='password' inputRef={register}/>
          <br /> <br />
           <span style={{ color: "red" }}>{user.error}</span>
        <Button variant="contained" color="primary" type="submit">
          Log in
        </Button>
        </form>
        <p>
          Don't have account? |
          <span onClick={() => setNewUser(!newUser)} style={{ color: "blue" }}>
            Create an account
          </span>
        </p>
      </div>
    );
};

export default Login;