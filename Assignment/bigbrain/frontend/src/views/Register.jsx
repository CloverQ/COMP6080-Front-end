import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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

function Register () {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [login, setLogin] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match!');
      return;
    }
    axios.post('http://localhost:5005/admin/auth/register', { email, password, name })
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token);
        setLogin(true);
      })
  }

  if (login) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div style={styles.div}>
        <h1>Register</h1>
        <TextField label="Email" style={styles.text} onChange={(e) => setEmail(e.target.value)}></TextField><br />
        <TextField label="Name" style={styles.text} onChange={(e) => setName(e.target.value)}></TextField><br />
        <TextField label="Password" type="password" style={styles.text} onChange={(e) => setPassword(e.target.value)}></TextField><br />
        <TextField label="Confirm Password" type="password" style={styles.text} onChange={(e) => setConfirmPassword(e.target.value)}></TextField><br />
        <Button style={styles.button} onClick={handleRegister}>Register</Button>
    </div>
  );
}

export default Register;
