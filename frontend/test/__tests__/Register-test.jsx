import React from 'react';
import UserRegister from '../../app/UserRegister';

test('Registration component shows all nessesary fields', () => {
    const register = shallow(<UserRegister />);
    expect(register.text()).toContain('Please enter your name', 'Please enter your password', 'Please enter your numer',
    'Please select your location');
  });