import React from 'react';
import NewAd from '../../app/NewAd';

test('New ad creation form contains nessesary fields', () => {
    const newAd = shallow(<NewAd />);
    expect(newAd.text()).toContain('Name', 'Description', 'Date', 'Cost', 'Status');
  });