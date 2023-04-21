import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = {
  div: {
    width: '80%',
    marginLeft: '40%',
    marginTop: '10%',
  },
  text: {
    width: '300px',
  },
  button: {
    marginTop: '20px',
  },
};

function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5005/admin/auth/login', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setLogin(true);
      })
  }

  if (login) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div style={styles.div}>
        <h1>Login</h1>
        <TextField label="Email" style={styles.text} onChange={(e) => setEmail(e.target.value)}></TextField><br />
        <TextField label="Password" type="password" style={styles.text} onChange={(e) => setPassword(e.target.value)}></TextField><br />
        <Button style={styles.button} onClick={handleLogin}>Login</Button>
        <p>Do not have account? Go to <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;
