import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '../components/Navigation';

describe('Navigation Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Navigation />);
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should contain the Nav element', () => {
    expect(wrapper.find('Nav').length).toEqual(1);
  });

  it('should contain the Logout component', () => {
    expect(wrapper.find('Logout').length).toEqual(1);
  });
});
