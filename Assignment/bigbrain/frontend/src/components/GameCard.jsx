import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { generatePath } from 'react-router';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

const styles = {
  button: {
    marginTop: '8px',
    marginLeft: '20px',
  },
  button1: {
    marginTop: '8px',
  }
};

function GameCard ({ game }) {
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [sessionID, setSessionID] = useState('');
  const [res, setRes] = useState(false)
  const [result, setResult] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseRes = () => setRes(false);
  const handleShowRes = () => setRes(true);
  const handleDelete = (id) => {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.delete(`http://localhost:5005/admin/quiz/${id}`, config)
      .then((res) => {
        alert('Game Delete Success!');
      })
  }
  const handleGameStart = (gameId) => {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.post(`http://localhost:5005/admin/quiz/${gameId}/start`, {}, config)
      .then((res) => {
        alert('start success!');
      })
    handleShow();
    axios.get(`http://localhost:5005/admin/quiz/${gameId}`, config)
      .then((res) => {
        console.log(res.data.active);
        setSessionID(res.data.active);
      })
  }
  const handleGameStop = (gameId) => {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.post(`http://localhost:5005/admin/quiz/${gameId}/end`, {}, config)
      .then((res) => {
        alert('stop success!');
      })
    handleClose();
    handleShowRes();
  }
  const handleAdvance = (gameId) => {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.post(`http://localhost:5005/admin/quiz/${gameId}/advance`, {}, config)
      .then((res) => {
        alert('advance success!');
      })
  }

  if (edit) {
    return <Redirect to={generatePath('/edit/:id', { id: game.id })} />
  }
  if (result) {
    return <Redirect to={generatePath('/results/:id', { id: sessionID })} />
  }

  return (
    <Card>
      <Card.Img variant="top" src={game.img} />
      <Card.Body>
        <Card.Title>Game Name: {game.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Game Owner: {game.owner}</Card.Subtitle>
        <Card.Text>Game ID: {game.id}</Card.Text>
        <Button variant="secondary" style={styles.button1} onClick={() => setEdit(true)}>Edit</Button>
        <Button variant="danger" style={styles.button} onClick={() => handleDelete(game.id)}>Delete</Button> <br />
        <Button variant="primary" style={styles.button1} onClick={() => handleGameStart(game.id)}>Start Game</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Game Started</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Here is the session code: </p>
            <p>{sessionID}</p>
            <div>
              <Tooltip title="Copy to clipboard" placement="right">
                <IconButton size="small" onClick={() => {
                  navigator.clipboard.writeText(`localhost:3000/join/${sessionID}`)
                }}>📋
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <Button variant="secondary" style={styles.button1} onClick={() => handleGameStop(game.id)}>Stop</Button>
              <Button variant="secondary" style={styles.button1} onClick={() => handleAdvance(game.id)}>Advance</Button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={res} onHide={handleCloseRes}>
          <Modal.Header closeButton>
            <Modal.Title>Game Stopped</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Would you like to view the results?</p>
            <Button variant="primary" style={styles.button1} onClick={() => setResult(true)}>Yes</Button>
            <Button variant="secondary" style={styles.button1} onClick={() => handleCloseRes}>No</Button>
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default GameCard;
