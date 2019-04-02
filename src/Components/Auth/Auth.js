import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/reducer'; 

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
      password: this.state.password
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
      <div className="Auth">
        <h1>Auth Component</h1>
        <input 
          type="text"
          value={username}
          placeholder='username'
          onChange={ e => this.handleChange('username', e.target.value) }
        
        />
        <input 
          type="password"
          value={password}
          placeholder='password'
          onChange={ e => this.handleChange('password', e.target.value) }
        
        />
        <button onClick={ this.login }>Login</button>
        <button onClick={ this.register }>Register</button>
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

export default connect(mapStateToProps, mapDispatchToProps  )(Auth);
