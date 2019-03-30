import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      input: '',
      posts: [],
      myPosts: true
    }
  }

  componentDidMount(){
    this.displayPosts();
  }

  displayPosts = () => {
    // this.state.posts.map(post => post)
    axios.get('/api/posts').then(res => {
      this.setState({ posts: res.data })
    })
  }

  handleChange(prop, val){
    this.setState({ [prop]: val })
  }

  render() {
    console.log(this.state.posts)
    const {posts} = this.state;
    const mappedPosts = posts.map( (post) => {
      return (
        <>
          <h3>{post.title}</h3>
          <p>{post.username}</p>
          <img src={post.img} alt="post"/>
        </>

      )
    })
    return (
      <div className="Dashboard">
        <h1>Dashboard Component</h1>
        <input 
          type="text" 
          placeholder="Search by Title" 
          onChange={ e => { this.handleChange('input', e.target.value) } }
        />
        <button>Search</button>
        <button>Reset</button>
        My Posts<input type="checkbox" value={this.state.myPosts} />
        <div>
          {mappedPosts}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);