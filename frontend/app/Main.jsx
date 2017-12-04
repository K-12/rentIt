import React from 'react';
import { render } from 'react-dom';
import UserList from './UserList';
import AdList from './AdList';
import UserRegister from './UserRegister';
import Header from './Header';
import Login from './Login';
import MyAdsList from './MyAdsList';
import NewAd from './NewAd';
import png from './people.png';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      window: [
        true, // home
        false, // Login
        false, // Register
        false, // users
        false, // ads
        false, // my ads
        false  // new ad
      ],
      token: '',
      username: '',
      showModal:false,
      showMessageModal: false,
      message: ''
    };
    this.setActive = this.setActive.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.handleOK=this.handleOK.bind(this);
    this.handleRegister=this.handleRegister.bind(this);
    this.handleNewAd=this.handleNewAd.bind(this);
  }
  handleRegister(m){
    this.setState({
      ...this.state,
      showMessageModal: true,
      message: m
    });
    this.setActive(1)
  }
  handleNewAd(m){
    this.setState({
      ...this.state,
      showMessageModal: true,
      message: m
    });
    this.setActive(5)
  }
  setLogin(t, n)
  {
    const defaultWindow = [
        true,
        false,
        false,
        false,
        false,
        false,
        false
      ];
    this.setState({
      ...this.state,
      token: t,
      username: n,
      window: defaultWindow,
      showModal: true,
    });
  }
  handleOK(){
    this.setState({
      ...this.state,
      showModal: false,
      showMessageModal: false
    });
  }
  setActive(n)
  {
    const defaultWindow = [
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ];
    defaultWindow[n] = true;
    this.setState({
      ...this.state,
      window: defaultWindow
    });
  }
  render() {
    return (
      <div>
        {this.state.showModal?
        <div className="modal"> 
          <div className="modal-content">
            <p> You are now logged in as <h2>{this.state.username}</h2> </p>
            <button onClick={this.handleOK}>OK</button>
          </div>
        </div> : ""
        }
        {this.state.showMessageModal?
        <div className="modal"> 
          <div className="modal-content">
            <p> {this.state.message} </p>
            <button onClick={this.handleOK}>OK</button>
          </div>
        </div> : ""
        }
        <Header
          window={this.state.window}
          setActive={this.setActive}
          username={this.state.username}
            />
        <div className="row">
          <div className="col-sm-4" />
          {this.state.window[0] ? (
          <div className="col-sm-4">
            Welcome to the 
            <h2>
              Rent it
            </h2>
            app
            <div>
              <img src={png} />
            </div>
          </div>
          ) : '' }
          {this.state.window[1] ? (<div className="col-sm-4"><Login setLogin={this.setLogin} /></div>) : '' }
          {this.state.window[2] ? (<div className="col-sm-4"><UserRegister register={this.handleRegister}/></div>) : ''}
          {this.state.window[3] ? (<div className="col-sm-4"><UserList /></div>) : '' }
          {this.state.window[4] ? (<div className="col-sm-4"><AdList token={this.state.token} /></div>) : ''}
          {this.state.window[5] ? (<div className="col-sm-4"><MyAdsList token={this.state.token} /></div>) : ''}
          {this.state.window[6] ? (<div className="col-sm-4"><NewAd token={this.state.token} modal={this.handleNewAd} /></div>) : ''}
        </div>
      </div>
    );
  }
}
