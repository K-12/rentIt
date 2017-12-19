import React from 'react';
import { render } from 'react-dom';

export default class AdList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: 'Loading...',
      ads: [],
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    console.log(`JWT ${this.props.token}`);
    return fetch('http://localhost:3000/ads', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: (`JWT ${this.props.token}`),
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          ads: responseJson,
          text: 'hello',
        }, () => {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (!this.state.isLoading) {
      const adList = this.state.ads.map((ad, index) => (
        <div className="container">
          <li className="list-group-item" key={index}>
            <h3>{ad.name}</h3>
            <div>Description: {ad.description}</div>
            <div>Available from: {ad.available_from_date}</div>
            <div>Cost: {ad.cost} E</div>
            <div>Status: {ad.status}</div>
          </li>
        </div>));
      return (
        <div>
          <div><h2>Ad list</h2></div>
          <ul className="list-group">{adList}</ul>
          <button onClick={this.getData}> press to work </button>
        </div>);
    }

    return ('Loading');
  }
}
