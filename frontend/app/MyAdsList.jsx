import React from 'react';
import { render } from 'react-dom';

export default class MyAdsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: 'Loading...',
      ads: [],
    };
    this.getData = this.getData.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendData = this.sendData.bind(this);
    this.deleteData=this.deleteData.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
  }
  handleSubmit(){
      
  }
  handleDelete(index){
      this.deleteData(index);
      this.getData();
  }
  handleUpdate(index){
      this.sendData(index);
  }
  sendData(index)
  {
    fetch('http://localhost:3000/myads/'+this.state.ads[index]._id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'authorization': ('JWT '+ this.props.token)
      },
      body: JSON.stringify(this.state.ads[index]),

    }).then((data) => {
        console.log('Request success: ', data.json());
      })
      .catch((error) => {
        console.log('Request failure: ', error);
      });
  }
  deleteData(index)
  {
    fetch('http://localhost:3000/myads/'+this.state.ads[index]._id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'authorization': ('JWT '+ this.props.token)
      }
    }).then((data) => {
        console.log('Request success: ', data);
      })
      .catch((error) => {
        console.log('Request failure: ', error);
      });
  }
  handleNameChange(n, index) {
      var tempAds = this.state.ads;
      tempAds[index].name = n;
    this.setState(...this.state, { ads:tempAds});
  }
  handleDescriptionChange(d, index)
  {
    var tempAds = this.state.ads;
    tempAds[index].description = d;
    this.setState(...this.state, { ads:tempAds});
  }
  handleDateChange(d, index)
  {
    var tempAds = this.state.ads;
    tempAds[index].available_from_date = d;
    this.setState(...this.state, { ads:tempAds});
  }
  handleCostChange(c, index)
  {
    var tempAds = this.state.ads;
    tempAds[index].cost = c;
    this.setState(...this.state, { ads:tempAds});
  }
  handleStatusChange(s, index) {
    var tempAds = this.state.ads;
    tempAds[index].status = s;
    this.setState(...this.state, { ads:tempAds});
  }
  componentDidMount() {
    this.getData();
  }
  getData()
  {
    console.log('JWT '+ this.props.token)
    return fetch('http://localhost:3000/myads', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'authorization': ('JWT '+ this.props.token)
      }
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
    if(!this.state.isLoading) {
    const adList = this.state.ads.map((ad, index) => (
      <div className="container">
        <li className="list-group-item" key={index}>
        <div>Name:
            <input onChange={(e)=>this.handleNameChange(e.target.value, index)} type="text" value={ad.name} />
        </div>
        <div>
              Description:
              <input onChange={(e)=>this.handleDescriptionChange(e.target.value, index)} type="text" value={ad.description} />
        </div>
        <div>Available from: 
            <input onChange={(e)=>this.handleDateChange(e.target.value, index)} type="string" value={ad.available_from_date} />
        </div>
        <div>
              Cost:
              <input onChange={(e)=>this.handleCostChange(e.target.value, index)} type="number" value={ad.cost} />
        </div>
        <div>
              Status:
        <select onChange={(e)=>this.handleStatusChange(e.target.value, index)} value={this.state.status}>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
        </select>
        </div>
        <button onClick={()=>this.handleUpdate(index)}>Save</button>
        <button onClick={()=>this.handleDelete(index)}>Delete</button>
        </li>
      </div>));
    return (<div>
      <div><h2>My Ads</h2></div>
      <ul className="list-group">{adList}</ul>
      <button onClick={this.getData}>Refresh</button>
            </div>);
  }
  else{
    return("Loading");
  }
}
}
