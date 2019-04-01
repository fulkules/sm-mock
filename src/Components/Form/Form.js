import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Form extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: '',
      img: '',
      content: ''
    }
  }

  handleInput = (prop, val) => {
    this.setState({ [prop]: val })
  }

  newPost = async () => {
    const {title, img, content} = this.state;
    const {user_id} = this.props;
    await axios.post('/api/post', {title, img, content, user_id})
  }

  render() {
    return (
      <div className="Form">
        <h1>Form Component</h1>
        <input type="text" value={this.state.title} onChange={ e => this.handleInput('title', e.target.value)} />
        <input type="text" value={this.state.img} onChange={ e => this.handleInput('img', e.target.value)} />
        <input type="text" value={this.state.content} onChange={ e => this.handleInput('content', e.target.value)} />
        <button onClick={ this.newPost }>Post</button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  console.log(reduxState)
  return reduxState.user_id 
}

export default connect(mapStateToProps)(Form);