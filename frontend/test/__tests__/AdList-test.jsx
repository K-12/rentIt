import React from 'react';
import AdList from '../../app/AdList';

test('Ad list renders ads', () => {
    const adList = shallow(<AdList />);
    expect(adList.text()).toContain('Vazonas');
  });