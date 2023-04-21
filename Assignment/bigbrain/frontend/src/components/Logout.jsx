import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Logout () {
  const [login, setLogin] = useState(true);
  const UserLogout = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.post('http://localhost:5005/admin/auth/logout', {}, config)
      .then((res) => {
        localStorage.removeItem('token');
        setLogin(false);
      })
  }
  if (login === false) {
    return <Redirect to='/login' />
  }
  return (
    <a onClick={UserLogout}>Logout</a>
  );
}

export default Logout;
