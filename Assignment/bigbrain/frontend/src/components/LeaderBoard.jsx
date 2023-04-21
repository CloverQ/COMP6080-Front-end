import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

const Leaderboard = (props) => {
  const { data: topPlayers } = props;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {topPlayers.map((row, idx) => (
          <tr key={row.name}>
            <td>{idx + 1}</td>
            <td>{row.name}</td>
            <td>{row.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

Leaderboard.propTypes = {
  data: PropTypes.array
};

export default Leaderboard;
