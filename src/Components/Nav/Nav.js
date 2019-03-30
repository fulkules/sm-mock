import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { clearUser, updateUser } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';

class Nav extends Component {

  componentDidMount(){
    this.getUser();
  }

  getUser = async () => {
    const { id } = this.props;
    if(!id){
        try {
            let res = await axios.get('/api/current');
            this.props.updateUser(res.data)
            // console.log(res)
        } catch(err) {
            this.props.history.push('/')
        }
    }
  }

  logout = async () => {
    await axios.post('/auth/logout');
    this.props.clearUser();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="Nav">
        <h1>Nav Component</h1>
        <button>Home</button>
        <button>New Post</button>
        <button onClick={ this.logout }>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
}

const mapDispatchToProps = {
  updateUser,
  clearUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));