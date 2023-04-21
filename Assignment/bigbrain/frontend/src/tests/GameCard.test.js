import React from 'react';
import { shallow } from 'enzyme';
import GameCard from '../components/GameCard';

describe('GameCard component', () => {
  const game = {
    id: 1,
    name: 'Test Game',
    owner: 'Test Owner',
    img: 'https://testimage.com',
  };
  const wrapper = shallow(<GameCard game={game} />);

  it('should render properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have a title', () => {
    expect(wrapper.find('CardTitle').text()).toEqual('Game Name: Test Game');
  });

  it('should have a subtitle', () => {
    expect(wrapper.find('CardSubtitle').text()).toEqual('Game Owner: Test Owner');
  });

  it('should have a game ID', () => {
    expect(wrapper.find('CardText').text()).toEqual('Game ID: 1');
  });

  it('should have a button to edit the game', () => {
    expect(wrapper.find({ variant: 'secondary', children: 'Edit' }).exists()).toBe(true);
  });

  it('should have a button to delete the game', () => {
    expect(wrapper.find({ variant: 'danger', children: 'Delete' }).exists()).toBe(true);
  });

  it('should have a button to start the game', () => {
    expect(wrapper.find({ variant: 'primary', children: 'Start Game' }).exists()).toBe(true);
  });

  it('should have a modal to show session code when game is started', () => {
    expect(wrapper.find('Modal').exists()).toBe(true);
    wrapper.find({ variant: 'primary', children: 'Start Game' }).simulate('click');
    expect(wrapper.find('Modal').exists()).toBe(true);
  });
});
