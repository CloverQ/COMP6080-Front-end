import React, { useState, useEffect } from 'react';
import QuizCard from '../components/QuizCard';
import { useParams } from 'react-router';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import uuid from 'react-uuid';

function EditGame () {
  const params = useParams();
  const [quizs, setQuizs] = useState([]);
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const [show, setShow] = useState(false);
  const [questionn, setQuestionn] = useState('');
  const [timeLimitt, setTimeLimitt] = useState('');
  const [imageURLL, setImageURLL] = useState('');
  const [pointss, setPointss] = useState('');
  const [videoURLL, setVideoURLL] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [answer5, setAnswer5] = useState('');
  const [checkBoxValues, setCheckBoxValues] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false
  });
  const answerList = [];
  const correctAnsList = [];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRadioChange = (e) => {
    setQuestionType(e.target.value);
  };
  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setCheckBoxValues({
      ...checkBoxValues,
      [name]: checked,
    });
  };
  const handleSubmit = () => {
    if (answer1 !== '') {
      const obj = {
        id: uuid(),
        answer: answer1
      };
      answerList.push(obj);
      if (checkBoxValues.option1) {
        correctAnsList.push(obj.id);
      }
    }
    if (answer2 !== '') {
      const obj = {
        id: uuid(),
        answer: answer2
      };
      answerList.push(obj);
      if (checkBoxValues.option2) {
        correctAnsList.push(obj.id);
      }
    }
    if (answer3 !== '') {
      const obj = {
        id: uuid(),
        answer: answer3
      };
      answerList.push(obj);
      if (checkBoxValues.option3) {
        correctAnsList.push(obj.id);
      }
    }
    if (answer4 !== '') {
      const obj = {
        id: uuid(),
        answer: answer4
      };
      answerList.push(obj);
      if (checkBoxValues.option4) {
        correctAnsList.push(obj.id);
      }
    }
    if (answer5 !== '') {
      const obj = {
        id: uuid(),
        answer: answer5
      };
      answerList.push(obj);
      if (checkBoxValues.option5) {
        correctAnsList.push(obj.id);
      }
    }

    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.get(`http://localhost:5005/admin/quiz/${params.gid}`, config)
      .then((res) => {
        // setQuizs(res.data.questions);
        // console.log(quizs)
        // setName(res.data.name);
        // setThumbnail(res.data.thumbnail);
        const quizs = res.data.questions;
        const name = res.data.name;
        const thumbnail = res.data.thumbnail;
        console.log(quizs)
        const newQuestion = {
          id: Number(quizs.length),
          question: questionn,
          questionType: questionType,
          timeLimit: timeLimitt,
          points: pointss,
          imageURL: imageURLL,
          videoURL: videoURLL,
          answerList: answerList,
          correctAnsList: correctAnsList
        }
        console.log(newQuestion)
        quizs.push(newQuestion)
        const questions = quizs
        const config = {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        axios.put(`http://localhost:5005/admin/quiz/${params.gid}`, { questions, name, thumbnail }, config)
          .then((res) => {
            alert('Add question successful!');
          })
        setShow(false);
      })
  }

  useEffect(() => {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.get(`http://localhost:5005/admin/quiz/${params.gid}`, config)
      .then((res) => {
        setQuizs(res.data.questions);
        setName(res.data.name);
        setThumbnail(res.data.thumbnail)
      })
  }, []);

  return (
    <div>
      <Navigation />
      <div>
        <h3>Game Name: {name}</h3>
        <p>Game ID: {params.gid}</p>
        <Container>
          <h3>Question List</h3>
          <Row>
            {quizs.map(quiz => (
              <Col key={quiz.id} md={4}>
                <QuizCard key={quiz.id} qid={quiz.id} question={quiz.question} timeLimit={quiz.timeLimit} points={quiz.points} imageURL={quiz.imageURL} gid={params.gid} videoURL={quiz.videoURL} questions={quizs} name={name} thumbnail={thumbnail} />
              </Col>
            ))}
          </Row>
        </Container>
        <Button variant="secondary" onClick={handleShow}>Add question</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Question: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Question</Form.Label>
                <Form.Control type="email" placeholder="Enter question" onChange={(e) => setQuestionn(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Time Limit</Form.Label>
                <Form.Control type="email" placeholder="Enter time limit" onChange={(e) => setTimeLimitt(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="email" placeholder="Enter image url" onChange={(e) => setImageURLL(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Points</Form.Label>
                <Form.Control type="email" placeholder="Enter points" onChange={(e) => setPointss(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Video URL</Form.Label>
                <Form.Control type="email" placeholder="Enter Video URL" onChange={(e) => setVideoURLL(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Question Type: </Form.Label>
                <div key='default-radio' className='mb-3'>
                  <Form.Check
                    type='radio'
                    id='Multiple Choice'
                    name='options'
                    label='Multiple Choice'
                    value='Multiple Choice'
                    checked={questionType === 'Multiple Choice'}
                    onChange={handleRadioChange}
                  />
                  <Form.Check
                    type='radio'
                    id='Single Choice'
                    name='options'
                    label='Single Choice'
                    value='Single Choice'
                    checked={questionType === 'Single Choice'}
                    onChange={handleRadioChange}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Answer1</Form.Label>
                <Form.Control type="email" placeholder="Enter answer1" onChange={(e) => setAnswer1(e.target.value)} />
                <Form.Check
                  type='checkbox'
                  id='option1'
                  name='option1'
                  label='Correct'
                  checked={checkBoxValues.option1}
                  onChange={handleCheckBoxChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Answer2</Form.Label>
                <Form.Control type="email" placeholder="Enter answer2" onChange={(e) => setAnswer2(e.target.value)} />
                <Form.Check
                  type='checkbox'
                  id='option2'
                  name='option2'
                  label='Correct'
                  checked={checkBoxValues.option2}
                  onChange={handleCheckBoxChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Answer3</Form.Label>
                <Form.Control type="email" placeholder="Enter answer3" onChange={(e) => setAnswer3(e.target.value)} />
                <Form.Check
                  type='checkbox'
                  id='option3'
                  name='option3'
                  label='Correct'
                  checked={checkBoxValues.option3}
                  onChange={handleCheckBoxChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Answer4</Form.Label>
                <Form.Control type="email" placeholder="Enter answer4" onChange={(e) => setAnswer4(e.target.value)} />
                <Form.Check
                  type='checkbox'
                  id='option4'
                  name='option4'
                  label='Correct'
                  checked={checkBoxValues.option4}
                  onChange={handleCheckBoxChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Answer5</Form.Label>
                <Form.Control type="email" placeholder="Enter answer5" onChange={(e) => setAnswer5(e.target.value)} />
                <Form.Check
                  type='checkbox'
                  id='option5'
                  name='option5'
                  label='Correct'
                  checked={checkBoxValues.option5}
                  onChange={handleCheckBoxChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>

  );
}

export default EditGame;
