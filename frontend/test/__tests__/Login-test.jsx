import React from 'react';
import Login from '../../app/Login';

test('Login component shows fields for name and password', () => {
  const login = shallow(<Login />);
  expect(login.text()).toContain('Please enter your name', 'Please enter your password');
});
