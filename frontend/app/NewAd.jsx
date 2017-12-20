import React from 'react';

export default class NewAd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      available_from_date: '2017-12-03',
      cost: 0,
      status: 'available',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  componentDidMount() {
  }
  handleNameChange(e) {
    this.setState(...this.state, { name: e.target.value });
  }
  handleDescriptionChange(e) {
    this.setState(...this.state, { description: e.target.value });
  }
  handleDateChange(e) {
    this.setState(...this.state, { available_from_date: e.target.value });
  }
  handleCostChange(e) {
    this.setState(...this.state, { cost: e.target.value });
  }
  handleStatusChange(e) {
    this.setState(...this.state, { status: e.target.value });
  }


  handleSubmit() {
    this.sendData();
  }

  sendData() {
    fetch('http://localhost:3000/myads', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: (`JWT ${this.props.token}`),
      },
      body: JSON.stringify(this.state),

    })
      .then((data) => {
        console.log('Request success: ', data);
        this.props.modal('Ad creation succesful!');
      })
      .catch((error) => {
        console.log('Request failure: ', error);
      });
  }
  render() {
    return (
      <div className="container" style={{ border: '1px solid', padding: '30px' }}>
        <div>
          <h2>New Ad</h2>
        </div>
        <div>
          <span>
                Name:
          </span>
          <input onChange={this.handleNameChange} type="text" value={this.state.name} />
        </div>
        <div>
          <span>
                Description:
          </span>
          <input onChange={this.handleDescriptionChange} type="text" value={this.state.description} />
        </div>
        <div>
          <span>
                Date:
          </span>
          <input onChange={this.handleDateChange} type="date" value={this.state.available_from_date} />
        </div>
        <div>
          <span>
                Cost:
          </span>
          <input onChange={this.handleCostChange} type="number" value={this.state.cost} />
        </div>
        <div>
          <span>
                Status:
          </span>
          <select onChange={this.handleStatusChange} value={this.state.status}>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
          </select>
        </div>
        <button onClick={this.handleSubmit}>Post</button>
      </div>
    );
  }
}
