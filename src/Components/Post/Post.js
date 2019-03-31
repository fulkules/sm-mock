import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: '',
      img: '',
      content: '',
      username: '',
      profile_pic: ''
    }
  }

  componentDidMount(){
    const {postid} = this.props.match.params;
    this.getPost(postid);
  }

  getPost = async (id) => {
    await axios.get(`/api/post/${id}`).then(res => {
      console.log(res)
      const {title, img, content, username, profile_pic} = res.data
      this.setState({ title, img, content, username, profile_pic });
    })
  }

  render() {
    const {title, content, img, username, profile_pic} = this.state;
    return (
      <div className="Post">
        <h1>Post Component</h1>
        <h3>{title}</h3>
        <p>{content}</p>
        <img src={img} alt="user post"/>
        <h5>{username}</h5>
        <img src={profile_pic} alt="profile"/>
      </div>
    );
  }
}

export default Post;