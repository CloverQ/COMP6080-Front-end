import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import GameCard from '../components/GameCard';

function Dashboard () {
  const [games, setGames] = useState([]);
  const config = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  useEffect(() => {
    axios.get('http://localhost:5005/admin/quiz', config)
      .then((res) => {
        setGames(res.data.quizzes);
        console.log(res.data.quizzes);
      })
  }, []);

  return (
    <div>
      <Navigation />
      <h3>Dashboard</h3>
      <Link to="/create"><Button variant="dark">Create New Game</Button></Link>
      <Container>
        <h3>Games List</h3>
        <Row>
          {games.map(game => (
            <Col key={game.id} md={4}>
              <GameCard game={game} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
