import React from 'react';
import { shallow } from 'enzyme';
import QuizCard from '../components/QuizCard';

describe('QuizCard', () => {
  it('should render correctly with props', () => {
    const props = {
      qid: 1,
      question: 'What is React?',
      timeLimit: 60,
      imageURL: 'https://example.com/image.png',
      points: 10,
      gid: 1,
      videoURL: 'https://example.com/video.mp4',
    };
    const wrapper = shallow(<QuizCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should open the edit modal when the edit button is clicked', () => {
    const props = {
      qid: 1,
      question: 'What is React?',
      timeLimit: 60,
      imageURL: 'https://example.com/image.png',
      points: 10,
      gid: 1,
      videoURL: 'https://example.com/video.mp4',
    };
    const wrapper = shallow(<QuizCard {...props} />);
    const editButton = wrapper.find('Button').at(0);
    editButton.simulate('click');
    expect(wrapper.find('Modal').prop('show')).toBe(true);
  });
});
