import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from '../components/Navigation';
import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function CreateGame () {
  const [name, setName] = useState('');
  const [file, setFile] = useState('');
  const [back, setBack] = useState('');

  const ReadFile = (file, gid, name) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      e.preventDefault();
      const json = JSON.parse(e.target.result);
      const questions = json.questions;
      const thumbnail = json.thumbnail;
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      questions.forEach((question, index) => {
        question.id = index;
      });
      axios.put(`http://localhost:5005/admin/quiz/${gid}`, { questions, name, thumbnail }, config)
        .then((res) => {
          alert('successfully created quiz with a file');
        })
    }
    reader.readAsText(file);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.post('http://localhost:5005/admin/quiz/new', { name }, config)
      .then((res) => {
        if (file) {
          if (file.name.split('.').pop().toLowerCase() === 'json') {
            ReadFile(file, res.data.quizId, name);
            console.log(res.data)
          } else {
            alert('Please attach json files only');
          }
        } else {
          alert('A new empty game has been created!');
          console.log(res.data)
        }
        setBack(true);
      })
  }

  if (back) {
    return (
      <Redirect to="/dashboard" />
    )
  }

  return (
    <div>
      <Navigation />
      <div>
        <h3>Create New Game</h3>
        <TextField label="Game Name" id="fullWidth" onChange={(e) => setName(e.target.value)} /> <br />
        <Input type="file" label="Image" onInput={e => setFile(e.target.files[0])}>Upload Game</Input> <br />
        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button><br />
      </div>
    </div>
  );
}

export default CreateGame;
