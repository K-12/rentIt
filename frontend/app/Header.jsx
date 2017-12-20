import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(n) {
    this.props.setActive(n);
  }
  render() {
    const active = 'header-element header-active';
    const inactive = 'header-element';
    const w = this.props.window;
    return (
      <div className="container-fluid header">
        {this.props.username != '' ? <span style={{ float: 'right', color: 'gray' }}>user: {this.props.username}</span> : ''}
        <ul>
          <li onClick={() => this.handleClick(0)} className={w[0] == true ? active : inactive}>Home</li>
          {this.props.username === '' ? <li onClick={() => this.handleClick(1)} className={w[1] == true ? active : inactive}>Login</li> : ''}
          {this.props.username === '' ? <li onClick={() => this.handleClick(2)} className={w[2] == true ? active : inactive}>Register</li> : ''}
          {this.props.username !== '' ? <li onClick={() => this.handleClick(3)} className={w[3] == true ? active : inactive}>View Users</li> : ''}
          {this.props.username !== '' ? <li onClick={() => this.handleClick(4)} className={w[4] == true ? active : inactive}>All Ads</li> : ''}
          {this.props.username !== '' ? <li onClick={() => this.handleClick(5)} className={w[5] == true ? active : inactive}>My Ads</li> : ''}
          {this.props.username !== '' ? <li onClick={() => this.handleClick(6)} className={w[6] == true ? active : inactive}>New Ad</li> : ''}
        </ul>
      </div>
    );
  }
}
