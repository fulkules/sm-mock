import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  constructor(props){
    super(props)

    this.state = {
      img: '',
      content: '',
      username: ''
    }
  }

  componentDidMount(){
    // console.log(this.props.match.params)
    const {postid} = this.props.match.params;
    // console.log(postid)
    this.getPost(postid);
  }

  getPost = async (id) => {
    let post = await axios.get(`/api/post/${id}`)
    // console.log(post)
      this.setState({  
        img: post.data[0].img,
        content: post.data[0].content,
        username: post.data[0].username
      });
  }

  render() {
    const {img, content, username} = this.state;
    return (
      <div className="Post">
        <img src={img} alt="user post"/>
        <p>{content}</p>
        <h3>{username}</h3>
      </div>
    );
  }
}

export default Post;