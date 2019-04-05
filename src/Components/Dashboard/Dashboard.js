import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.div`
	background: black;
`

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      search: '',
			posts: [],
			unchecked: true
    }
  }



  componentDidMount(){
	this.getUser();
  }

	getUser = async () => {
		console.log(this.props)
		const { id } = this.props;
		if(!id){
			try {
				let res = await axios.get('/api/current');
				this.props.updateUser(res.data)
				this.initComponent()
				// console.log(res)
			} catch(err) {
				console.log(err)
				this.props.history.push('/')
			}
		} else {
			this.displayPosts();
		}
	}

	initComponent = () => {
		this.displayPosts();
	}

	displayPosts = async () => {
	  // this.state.posts.map(post => post)
		await axios.get('/api/posts').then(res => {				
	  		this.setState({ posts: res.data })
	    })
	}

	handleCheck = () => {
		this.setState({
			unchecked: !this.state.unchecked
		})
	}

	searchPost=async()=>{
		const {search,unchecked} = this.state;
		const {id} =this.props;

		if(!unchecked && search != ''){
				let posts = await axios.get(`/posts/getAllSearch?search=${search}`)
				console.log(444,posts.data)
				this.setState({
						posts:posts.data,
						search:''
				})
		} else if(!unchecked && search === ''){
				let posts = await axios.get(`/posts/getUser/${id}`)
				this.setState({
						posts:posts.data,
						search:''
				})
		} else if(unchecked && search !== ''){
				let posts = await axios.get(`/posts/getNonUser?search=${search}&id=${id}`)
				this.setState({
						posts:posts.data,
						search:''
				})
		} else {
				this.displayPosts();
		}
}


  handleChange(prop, val){
    this.setState({ [prop]: val })
  }

  handleBox = () => {
    this.setState({ myPosts: !this.state.myPosts })
  }

  render() {
		console.log(this.state.posts)
		console.log(this.props)
		const {posts, unchecked, search } = this.state;
    const mappedPosts = posts.map( (post, i) => {
			// const {profile_pic} = this.state.post[i]
      return (
      	<Link key={post.id} to={`/post/${post.id}`} style={{textDecoration: 'none'}}>
					<div 
						style={{
							width: '40rem',
							padding: '0.5rem',
							border: '1px solid #222',
							overflowY: 'scroll',
							margin: '.5rem',
							boxShadow: '2px 2px #777',
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<h3
							style={{
								display: 'flex',
								justifyContent: 'flex-start'
							}}
						>{post.title}</h3>

						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center'
							}}
						>
							<p
								style={{
									marginRight: '1rem'
								}}
							>by: {post.username}</p>
							<img 
								src={post.profile_pic} 
								alt="profile" 
								style={{
									height: '3rem',
									marginRight: '1rem',
									borderRadius: '50%',
									border: '1px solid #222',
									boxShadow: '2px #777'
								}}
							/>
						</div>
					</div>
      	</Link>
      )
    })
    return (
		<div 
			className="Dashboard"
			style={{
				background: '#F2F2F2',
				height: '100vh',
				width: 'calc(100vw - 7rem)',
				float: 'right',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				alignContent: 'center',
				overflowY: 'scroll'
				
			}}
		>
      <div style={{
				display: 'flex',
				width: '40rem',
				justifyContent: 'space-evenly',
				boxShadow: '2px 2px #777',
				alignItems: 'center',
				border: '1px solid #222',
				padding: '0.5rem'
			}}>
				<input 
					type="text" 
					placeholder="Search by Title" 
					value={search}
					onChange={ e => { this.handleChange('search', e.target.value) } }
					style={{
						borderRadius: '1rem',
						height: '1.5rem',
						width: '10rem'
					}}
				/>
				<button onClick={ this.searchPost }>Search</button>
				<button onClick={ this.displayPosts }>Reset</button>
				<input 
					type="checkbox"
					value={unchecked} 
					onChange={this.handleCheck}
				/>My Posts
			</div>
        	<div
						className='posts-container'
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							alignContent: 'center'
						}}
					>
        	  {mappedPosts}
        	</div>
      	</div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  // console.log(reduxState)
  return reduxState;
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);