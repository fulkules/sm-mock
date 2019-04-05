import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { clearUser, updateUser } from '../../ducks/reducer';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.div`
  display: flex;
  height: 100vh;
  position: fixed;
  width: 7rem;
  float: left;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: linear-gradient(-80deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  background-size: 400% 400%;
  -webkit-animation: Gradient 15s ease infinite;
  -moz-animation: Gradient 15s ease infinite;
  animation: Gradient 15s ease infinite;

  @-webkit-keyframes Gradient {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
    
  @-moz-keyframes Gradient {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
    
  @keyframes Gradient {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }

  Link {
    text-decoration: none;
  }

  i {
    textDecoration: none;
    display: flex;

  }
`;

class Nav extends Component {

  logout = async () => {
    await axios.post('/auth/logout');
    this.props.clearUser();
    this.props.history.push('/');
  }

  render() {
    console.log(this.props)
    return (
      <Navbar>

        <Link to="/dashboard" style={{textDecoration: 'none', color: '#fff'}}><i className="fas fa-home fa-3x"></i></Link>
        <Link to="/new" style={{textDecoration: 'none', color: '#fff'}}><i className="far fa-plus-square fa-3x"></i></Link>
        <i style={{color: '#fff'}} onClick={ this.logout } className="fas fa-power-off fa-3x"></i>
      </Navbar>
    );
  }
}

const mapStateToProps = (reduxState) => {
  // console.log(reduxState)
  const {username, img } = reduxState;
  return {
    username,
    img
  };
}

const mapDispatchToProps = {
  updateUser,
  clearUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));