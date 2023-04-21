import React from 'react';
import { shallow } from 'enzyme';
import Leaderboard from '../components/LeaderBoard';

describe('<Leaderboard />', () => {
  const mockData = [
    { name: 'John Doe', score: 100 },
    { name: 'Jane Doe', score: 90 }
  ];

  it('renders a table with the correct number of rows', () => {
    const wrapper = shallow(<Leaderboard data={mockData} />);
    expect(wrapper.find('tr').length).toEqual(mockData.length + 1);
  });

  it('renders the correct rank for each row', () => {
    const wrapper = shallow(<Leaderboard data={mockData} />);
    wrapper.find('tr').forEach((row, idx) => {
      if (idx > 0) { // Skip the header row
        expect(row.find('td').first().text()).toEqual(`${idx}`);
      }
    });
  });

  it('renders the correct name and score for each row', () => {
    const wrapper = shallow(<Leaderboard data={mockData} />);
    wrapper.find('tr').forEach((row, idx) => {
      if (idx > 0) { // Skip the header row
        expect(row.find('td').at(1).text()).toEqual(mockData[idx - 1].name);
        expect(row.find('td').at(2).text()).toEqual(`${mockData[idx - 1].score}`);
      }
    });
  });
});
