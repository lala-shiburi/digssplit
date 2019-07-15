import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Expenses from './pages/Expenses';
import TemplatePage from './pages/TemplatePage';

class App extends Component {
	state = {
		drawer: false,
		email:'',
		password:'',
	};

	toggleDrawer = open => event => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		this.setState({ drawer: open });
	};

	handleChange = name => event => {
    	this.setState({ ...this.state, [name]: event.target.value });
  	};

	render() {
		return (
			<div className="App">
        <TemplatePage drawer={this.state.drawer} toggleDrawer={this.toggleDrawer}>
				<BrowserRouter>
					<Switch>
						<Route
							exact
							path="/"
							// render={props => (
							// 	<Home
							// 		{...props}

							// 	/>
							// )}
							component={Home}
						/>
						<Route exact path="/login" render={props => (<Login {...props} email={this.state.email} password={this.state.password} handleChange={this.handleChange} />)} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/expenses" component={Expenses} />
					</Switch>
				</BrowserRouter>
        </TemplatePage>
			</div>
		);
	}
}

export default App;
