import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import { withRouter } from 'react-router-dom';
import Form from './Components/Form/Form';

class App extends Component {
  render() {
    // console.log(this.props.location)
    return (
      <div className="App">
        { this.props.location.pathname !== '/' && <Nav location={this.props.location} /> }
        { routes }
      </div>
    );
  }
}

export default withRouter(App);
