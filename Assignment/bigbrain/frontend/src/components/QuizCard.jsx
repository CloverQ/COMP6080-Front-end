import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import uuid from 'react-uuid';

function QuizCard (props) {
  const { qid, question, timeLimit, imageURL, points, gid, videoURL } = props;
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
    axios.get(`http://localhost:5005/admin/quiz/${gid}`, config)
      .then((res) => {
        // setQuizs(res.data.questions);
        // console.log(quizs)
        // setName(res.data.name);
        // setThumbnail(res.data.thumbnail);
        const quizs = res.data.questions;
        const name = res.data.name;
        const thumbnail = res.data.thumbnail;
        console.log(quizs)
        let idx = -1;
        let que = -1;
        quizs.map((q, index) => {
          if (q.id === Number(qid)) {
            que = q;
            idx = index;
          }
          return 0;
        });
        const newQuestion = {
          id: Number(que.id),
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
        quizs[idx] = newQuestion;
        const questions = quizs
        const config = {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        axios.put(`http://localhost:5005/admin/quiz/${gid}`, { questions, name, thumbnail }, config)
          .then((res) => {
            alert('Edit question successful!');
          })
        setShow(false);
      })
  }

  return (
    <Card>
      <Card.Img variant="top" src={imageURL} />
      <Card.Body>
        <Card.Title>Question {qid + 1}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Question: {question}</Card.Subtitle>
        <Card.Text>Time Limit: {timeLimit}</Card.Text>
        <Card.Text>Points: {points}</Card.Text>
        <Card.Text>Video URL: {videoURL}</Card.Text>
        <Button variant="primary" onClick={handleShow}>Edit</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Question: {qid + 1}</Modal.Title>
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
      </Card.Body>
    </Card>
  );
}

export default QuizCard;
