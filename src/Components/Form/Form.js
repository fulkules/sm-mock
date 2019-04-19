import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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
    await axios.post('/api/new', { title, img, content })
    this.props.history.push('/dashboard');
  }

  render() {
    // console.log(this.props)
    return (
      <div 
        className="Form"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignContent: 'stretch',
          padding: '2rem'
        }}
      >
        <h1 style={{
          color: '#6C83B8'
        }}
        >NEW POST</h1>
        Title:<input 
          type="text" 
          value={this.state.title} 
          onChange={ e => this.handleInput('title', e.target.value)} 
          placeholder="post title" 
          max="45"
          style={{ margin: '1rem 0'}}
        />
        Image URL:<input 
          type="text" 
          value={this.state.img} 
          onChange={ e => this.handleInput('img', e.target.value)} 
          placeholder="img URL..." 
          style={{ margin: '1rem 0'}}
        />
        Content:<input 
          type="textarea" 
          value={this.state.content} 
          onChange={ e => this.handleInput('content', e.target.value)} 
          placeholder="content..." 
          style={{ 
            margin: '1rem 0'
          }}
        />
        <button onClick={ this.newPost }>Post</button>
      </div>
    );
  }
}

export default withRouter(Form);