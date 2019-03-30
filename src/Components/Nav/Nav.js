import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { clearUser, updateUser } from '../../ducks/reducer';
import { withRouter, Link } from 'react-router-dom';

class Nav extends Component {

  logout = async () => {
    await axios.post('/auth/logout');
    this.props.clearUser();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="Nav">
        <h1>Nav Component</h1>
        <Link to="/dashboard"><button>Home</button></Link>
        <Link to="/new"><button>New Post</button></Link>
        <button onClick={ this.logout }>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  console.log(reduxState)
  const {username, img } = reduxState;
  return {
    username: reduxState.username,
    img: reduxState.img
  };
}

const mapDispatchToProps = {
  updateUser,
  clearUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));