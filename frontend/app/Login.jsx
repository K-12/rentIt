import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  handleNameChange(e) {
    this.setState(...this.state, { name: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState(...this.state, { password: e.target.value });
  }

  handleLogin() {
    this.sendData();
  }

  sendData() {
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then(response => response.json())
      .then((responseJson) => {
        if (responseJson.token !== undefined) { this.props.setLogin(responseJson.token, responseJson.name); }
      })
      .catch((error) => {
        console.log('Request failure: ', error);
      });
  }

  render() {
    return (
      <div className="container" style={{ border: '1px solid', padding: '30px' }}>
        <div>
          <h2> Login </h2>
        </div>
        <div>
          <span> Please enter your name: </span>
          <input onChange={this.handleNameChange} type="text" value={this.state.name} />
        </div>
        <div>
          <span> Please enter your password: </span>
          <input onChange={this.handlePasswordChange} type="password" value={this.state.password} />
        </div>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}
