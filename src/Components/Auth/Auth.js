import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/reducer'; 
import './Auth.css';

class Auth extends Component {
  constructor(){
    super()

    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange(prop, val){
    this.setState({
      [prop]: val
    })
  }

  componentDidMount(){
    this.checkUser();
  }

  checkUser = async () => {
    const { id } = this.props;
    if(!id){
      try{
        let res = await axios.get('/api/current');
        this.props.updateUser(res.data);
        this.props.history.push('/dashboard');
        // console.log(res)
      } catch(err) {
        console.log(err)
        this.props.history.push('/')
      }
    } else {
      this.props.history.push('/dashboard');
    }
  }

  register = async () => {
    let user = {
      username: this.state.username,
      password: this.state.password,
      profile_pic: `https://robohash.org/${(Math.random(this.props.id))}`
    }
    try {
      let res = await axios.post('/auth/register', user)
      // console.log(res.data)
      this.props.updateUser(res.data);
      this.props.history.push('/dashboard');
    } catch(err) {
      console.log(err)
      alert('Choose a unique username');
    }
  }

  login = async () => {
    let user = {
      username: this.state.username,
      password: this.state.password
    }
    try {
      let res = await axios.post('/auth/login', user);
      // console.log(res)
      this.props.updateUser(res.data);
      this.props.history.push('/dashboard');
    } catch(err) {
      console.log(err)
      alert('Invalid login');
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div 
        className="gradients"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw'
        }}>
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            padding: '3rem',
            boxShadow: '2px 2px 2px 2px #777',
            borderRadius: '1rem'
            }}>
          <i className="far fa-smile-wink fa-9x"></i>
          <h1>Social Media Mock</h1>
          <input 
            type="text"
            value={username}
            placeholder='username'
            onChange={ e => this.handleChange('username', e.target.value) }
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '.5rem',
              borderRadius: '1rem',
              height: '1.8rem'
            }}
          />
          <input 
            type="password"
            value={password}
            placeholder='password'
            onChange={ e => this.handleChange('password', e.target.value) }
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '.5rem',
              borderRadius: '1rem',
              height: '1.8rem'
            }}
          />
            <button 
              onClick={ this.login }
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '.5rem',
                height: '2rem',
                width: '7rem',
                borderRadius: '2rem',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
            <button 
              onClick={ this.register }
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '.5rem',
                height: '2rem',
                width: '7rem',
                borderRadius: '2rem',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    id: reduxState.id
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps )(Auth);
