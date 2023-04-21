import React from 'react';
import { shallow } from 'enzyme';
import Logout from '../components/Logout';

describe('Logout component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Logout />);
  });

  it('should render a Logout link', () => {
    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('a').text()).toEqual('Logout');
  });
});
