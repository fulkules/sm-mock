import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      search: '',
      posts: [],
      myPosts: true,
    }
  }

  componentDidMount(){
    this.displayPosts();
  }

  displayPosts = async () => {
    // this.state.posts.map(post => post)
    await axios.get('/api/posts').then(res => {
      this.setState({ posts: res.data })
    })
  }

  handleChange(prop, val){
    this.setState({ [prop]: val })
  }

  handleBox = () => {
    this.setState({ myPosts: !this.state.myPosts })
  }

  render() {
    // console.log(this.state.posts)
    const {posts} = this.state;
    const mappedPosts = posts.map( (post, i) => {
      return (
        <Link key={post.id} to={`/post/${post.id}`}>
          <h3>{post.title}</h3>
          <p>{post.username}</p>
          <p>{post.content}</p>
          <img src={post.img} alt="user post"/>
        </Link>
      )
    })
    return (
      <div className="Dashboard">
        <h1>Dashboard Component</h1>
        <input 
          type="text" 
          placeholder="Search by Title" 
          value={this.state.search}
          onChange={ e => { this.handleChange('search', e.target.value) } }
        />
        <button>Search</button>
        <button>Reset</button>
        My Posts<input type="checkbox" value={this.state.myPosts} onChange={ this.handleBox } />
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