import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { generatePath, Redirect, useParams } from 'react-router';
import axios from 'axios';

function JoinGame () {
  const params = useParams();
  const [sid, setSid] = useState(params.sid ? params.sid : '');
  const [name, setName] = useState('');
  const [pid, setPid] = useState('');
  const [play, setPlay] = useState(false);

  const handleJoin = (sid, name) => {
    if (name === '') {
      alert('Please enter your name');
      return;
    }
    if (sid === '') {
      alert('Please enter your session id');
      return;
    }
    axios.post(`http://localhost:5005/play/join/${sid}`, { name })
      .then((res) => {
        setPid(res.data.playerId);
        setPlay(true);
        alert('join success!')
      })
  }

  if (play) {
    return <Redirect to={generatePath('/play/:pid', { pid: pid })} />
  }

  return (
    <div>
      <Navigation />
      <h3>Join Game</h3>
      <Form className="d-flex justify-content-center">
      <Row>
        <Col xs={12} sm={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Session ID</Form.Label>
            <Form.Control type="email" placeholder="Enter sesseion ID" onChange={(e) => setSid(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
            <Form.Control type="email" placeholder="Enter name" onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={() => handleJoin(sid, name)}>
            Join Game
          </Button>
        </Col>
      </Row>
    </Form>
    </div>
  );
}

export default JoinGame;
