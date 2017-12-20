import React from 'react';

export default class UserRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      location: 'Kitas',
      number: '',
      password: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  componentDidMount() {
  }
  handleNameChange(e) {
    this.setState(...this.state, { name: e.target.value });
  }
  handleNumberChange(e) {
    this.setState(...this.state, { number: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState(...this.state, { password: e.target.value });
  }
  handleLocationChange(e) {
    this.setState(...this.state, { location: e.target.value });
  }

  handleRegister(e) {
    this.sendData();
  }

  sendData() {
    const testPayload = {
      name: 'hello',
      number: '123',
      password: '12345',
    };
    fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.state),

    })
      .then((data) => {
        console.log('Request success: ', data);
        this.props.register('Success. You can now log in!');
      })
      .catch((error) => {
        console.log('Request failure: ', error);
      });
  }

  render() {
    return (
      <div className="container" style={{ border: '1px solid', padding: '30px' }}>
        <div>
          <h2>User registration</h2>
        </div>
        <div>
          <span>
                        Please enter your name:
          </span>
          <input onChange={this.handleNameChange} type="text" value={this.state.name} />
        </div>
        <div>
          <span>
                        Please enter your phone number:
          </span>
          <input onChange={this.handleNumberChange} type="number" value={this.state.number} />
        </div>
        <div>
          <span>
                        Please enter your password:
          </span>
          <input onChange={this.handlePasswordChange} type="password" value={this.state.password} />
        </div>
        <div>
          <span>
                        Please select your location:
          </span>
          <select onChange={this.handleLocationChange} value={this.state.location}>
            <option value="Kitas">Kitas</option>
            <option value="Vilnius">Vilnius</option>
            <option value="Kaunas">Kaunas</option>
            <option value="Klaipeda">Klaipeda</option>
          </select>
        </div>
        <button onClick={this.handleRegister}>Register</button>
      </div>
    );
  }
}
