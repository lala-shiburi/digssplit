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
				amount: 2000,
				membersOwing: [1,2,3],
				ownerId: '12'
			},
			{
				name: 'Uber',
				category: 'transport',
				amount: 100,
				membersOwing: [0,1,2],
				ownerId: '12'
			},
			{
				name: 'Black Label',
				category: 'booze',
				amount: 1000,
				membersOwing: [1,2,3],
				ownerId: '12'
			}
		],
		payed:[]
		
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

	handleCheckBox= e => {
		// const { checkboxes, checkbox } = this.state;
		// // checkboxes[index] = !checkboxes[index];
		// function isUserId(element) {
		// 	return Object.keys(element) == 1;
		// }
		// let index = checkbox.findIndex(isUserId);
		// checkbox[index][userId] = !checkbox[index][userId];
		// console.log(index,checkbox);
		//  this.setState({
		// 	checkbox
		// 	});
		console.log('you clicked something there chief',e.target.value)
		const{payed}=this.state;
		let userId= e.target.value;
		// var array1 = [1,2,3,4,5,6,7,8,9],
    	// array2 = [1,2,3,4,5,6,7,8,9,10],
    	// result = [];

		// result = array2.filter(function(item){
  		// 	if ( array1.indexOf(item) !== -1 ) return item;
		// });
		let index=payed.indexOf(userId);
		if( index !== -1){
			payed.splice(index,1)
		}else{
			payed.push(userId)
		}

		this.setState({payed})

		console.log(payed);
		// console.log(index);
		// this.setState({
		// 	checkboxes
		// });
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
								render={props => (
									<Expenses
										{...props}
										categories={this.state.categories}
										expenses={this.state.expenses}
										checkbox={this.state.checkbox}
										handleCheckBox={this.handleCheckBox}
									/>
								)}
							/>
						</Switch>
					</BrowserRouter>
				</TemplatePage>
			</div>
		);
	}
}

export default App;
