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
    const {posts, unchecked, search } = this.state;
    const mappedPosts = posts.map( post => {
      return (
        <Link key={post.id} to={`/post/${post.id}`}>
			<div>
				<h3>{post.title}</h3>
				<p>{post.username}</p>
				<img src={post.img} alt=""/>
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
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				alignContent: 'center',
				
			}}
		>
        	<div>
				<input 
					type="text" 
					placeholder="Search by Title" 
					value={this.state.search}
					onChange={ e => { this.handleChange('search', e.target.value) } }
					style={{
						borderRadius: '1rem',
						height: '1.8rem',
						display: 'flex',
						// justifyContent: 'center',
						// alignItems: 'flex-start',
						// alignContent: 'center',
						
					}}
				/>
				<button onClick={ this.searchPost }>Search</button>
				<button onClick={ this.displayPosts }>Reset</button>
				<input 
					type="checkbox"
					value={unchecked} 
					onChange={this.handleCheck}
				/>
			</div>
        	<div
						className='posts-container'
						style={{
							display: 'flex',
							flexDirection: 'column',
							flexWrap: 'nowrap',
							justifyContent: 'center',
							alignItems: 'stretch',
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