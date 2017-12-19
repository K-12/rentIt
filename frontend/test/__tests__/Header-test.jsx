import React from 'react';
import Header from '../../app/Header';


test('Header shows logged in user (if given)', () => {
  const header = shallow(<Header username={"Test"} window={[1,0,0,0,0,0,0]} />);
  expect(header.text()).toContain('user: Test');
});

test('Header shows login and register tabs with no user provided', () => {
  const header = shallow(<Header username={""} window={[1,0,0,0,0,0,0]} />);
  expect(header.text()).toContain('Login', 'Register');
});

test('Header shows ads and users when user provided', () => {
  const header = shallow(<Header username={"Test"} window={[1,0,0,0,0,0,0]} />);
  expect(header.text()).toContain('View Users', 'All Ads', 'My Ads', 'New Ad');
});
