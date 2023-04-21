import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { useParams } from 'react-router-dom';
import Leaderboard from '../components/LeaderBoard';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';

const styles = {
  container: {
    margin: 'auto',
    width: '90%',
    maxWidth: 1200,
  },
  title: {
    textAlign: 'center',
  },
};

function GameResult () {
  const params = useParams();
  const [questionNum, setQuestionNum] = useState(0);
  const [playerNum, setPlayerNum] = useState(0);
  const [topPlyers, setTopPlayers] = useState([]);
  const [percent, setPercent] = useState([]);
  const [Ave, setAve] = useState([]);

  const responseTime = (startTime, answerTime) => (new Date(answerTime) - new Date(startTime)) / 1000;
  const handleResult = (res, numPlayers) => {
    if (!res.length) {
      return;
    }
    const num = res[0].answers.length;
    const correct = new Array(num).fill(0);
    const totalTime = new Array(num).fill(0);
    const playerScores = {};
    for (let i = 0; i < res.length; i++) {
      const { name, answers } = res[i];
      playerScores[name] = 0;
      for (let j = 0; j < answers.length; j++) {
        const { questionStartedAt, answeredAt, correct } = answers[j];
        totalTime[j] += responseTime(questionStartedAt, answeredAt);
        if (correct) {
          correct[j]++;
          playerScores[name]++;
        }
      }
    }
    setQuestionNum(num);
    setPercent(correct.map((count) => count / numPlayers * 100));
    setAve(totalTime.map((total) => total / numPlayers));

    const topPlayers = Object.entries(playerScores)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .slice(0, 5)
      .map(([name, score]) => ({ name, score }));
    setTopPlayers(topPlayers);
  };

  const generateLabels = (numQuestions) => {
    return Array(numQuestions).fill().map((_, index) => index + 1);
  }

  const data1 = {
    labels: generateLabels(questionNum),
    datasets: [
      {
        label: 'Questions players answered correctly (%)',
        data: percent,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,1)',
      }
    ]
  };
  const options1 = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem) => {
          return `${tooltipItem.value} %`
        }
      }
    }
  };

  const data2 = {
    labels: generateLabels(questionNum),
    datasets: [
      {
        label: 'Average question response time (s)',
        data: Ave,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,1)',
        fill: false,
      }
    ]
  };
  const options2 = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem) => {
          return `${tooltipItem.value} s`
        }
      }
    }
  };

  useEffect(() => {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.get(`http://localhost:5005/admin/session/${params.sid}/results`, config)
      .then((res) => {
        setPlayerNum(res.data.results.length);
        handleResult(res.data.results, res.data.results.length);
      })
  }, []);

  if (questionNum === 0 || playerNum === 0) {
    return (
      <div>
        <Navigation />
        <h3>Game Results: {params.sid}</h3>
        <h3>No result to display.</h3>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <h3>Game Results: {params.sid}</h3>
      <div style={styles.container}>
        <h4 style={styles.title}>Player LeaderBoard</h4>
        <Leaderboard data={topPlyers} />
        <h4 style={styles.title}>Breakdown of correct question responses</h4>
        <Bar data={data1} options={options1} /><br />
        <h4 style={styles.title}>Average question response time Line Chart</h4>
        <Line data={data2} options={options2} />
      </div>
    </div>
  );
}

export default GameResult;
