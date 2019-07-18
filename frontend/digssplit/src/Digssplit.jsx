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
		email: '',
		password: '',
		emailSignUp: '',
		passwordSignUp: '',
		passwordSignUpConfirm: '',
		createDigs: 'true',
		joiningDigs: '',
		digs: '',
		categories: ['utilities', 'transport', 'booze'],
		expenses: [
			{
				name: 'Electricity',
				category: 'utilities',
				membersOwing: 'Lala',
				ownerId: '12'
			},
			{
				name: 'Uber',
				category: 'transport',
				membersOwing: 'Lala',
				ownerId: '12'
			},
			{
				name: 'Black Label',
				category: 'booze',
				membersOwing: 'Lala',
				ownerId: '12'
			}
		]
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

	handleChangeRadio = event => {
		this.setState({ createDigs: event.target.value });
	};

	handleAutoComplete = input => {
		this.setState({ joiningDigs: input });
	};

	render() {
		return (
			<div className="App">
				<TemplatePage
					drawer={this.state.drawer}
					toggleDrawer={this.toggleDrawer}
				>
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
							<Route
								exact
								path="/login"
								render={props => (
									<Login
										{...props}
										email={this.state.email}
										password={this.state.password}
										handleChange={this.handleChange}
									/>
								)}
							/>
							<Route
								exact
								path="/signup"
								render={props => (
									<Signup
										{...props}
										emailSignUp={this.state.emailSignUp}
										passwordSignUp={this.state.passwordSignUp}
										passwordSignUpConfirm={this.state.passwordSignUpConfirm}
										handleChange={this.handleChange}
										handleChangeRadio={this.handleChangeRadio}
										createDigs={this.state.createDigs}
										handleAutoComplete={this.handleAutoComplete}
										digs={this.state.digs}
									/>
								)}
							/>
							<Route
								exact
								path="/expenses"
								render={props => 
								<Expenses 
								{...props} 
								categories={this.state.categories}
								expenses={this.state.expenses}

								/>
									
								}
							/>
						</Switch>
					</BrowserRouter>
				</TemplatePage>
			</div>
		);
	}
}

export default App;
