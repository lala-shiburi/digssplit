import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Expenses from './pages/Expenses';
import TemplatePage from './pages/TemplatePage';

class App extends Component {
	state = {
		drawer: false,
		username: '',
		email: '',
		password: '',
		usernameSignUp: '',
		emailSignUp: '',
		passwordSignUp: '',
		passwordSignUpConfirm: '',
		createDigs: 'true',
		joiningDigs: '',
		digs: '',
		expenses: [
			{
				name: 'Electricity',
				category: 'UTILITIES',
				amount: 2000,
				membersOwing: [1, 2, 3],
				ownerId: '12'
			},
			{
				name: 'Uber',
				category: 'TRANSPORT',
				amount: 100,
				membersOwing: [0, 1, 2],
				ownerId: '12'
			},
			{
				name: 'Black Label',
				category: 'BOOZE',
				amount: 1000,
				membersOwing: [1, 2, 3],
				ownerId: '12'
			}
		],
		path: '',
		payed: [],
		isDialogOpen: false,
		expensename: '',
		amount: '',
		categoriesList: [
			'UTILITIES',
			'HOUSEHOLD ITEMS',
			'TRANSPORT',
			'FOOD',
			'ENTERTAINMENT',
			'BOOZE',
			'LOAN SHARK'
		],
		categories: ['UTILITIES', 'TRANSPORT', 'BOOZE'],
		selectedCategory: '',
		members: [0, 1, 2, 3, 4],
		selectedMembers: [],
		AUTH_TOKEN: '',
		AUTHENTICATED: false
	};

	// axios.defaults.headers.common['Authorization'] = this.state.AUTH_TOKEN;

	toggleDrawer = open => event => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		this.setState({ drawer: open });
	};

	currentPath = () => window.location.href;

	signIn = () => {
		console.log('You are trying to login');
		axios
			.post('http://localhost:8000/rest-auth/login/', {
				email: this.state.email,
				password: this.state.password
			})
			.then(response => {
				console.log(response.data.key);
				let auth = 'Token ' + response.data.key;
				this.setState({ AUTH_TOKEN: auth });
			})
			.catch(error => {
				console.log(error);
			});
	};

	signUp = () => {
		console.log('You are trying to sign up');
		axios
			.post('http://localhost:8000/rest-auth/registration/', {
				username: this.state.usernameSignUp,
				email: this.state.emailSignUp,
				password1: this.state.passwordSignUp,
				password2: this.state.passwordSignUpConfirm,
				digs: { name: this.state.digs }
			})
			.then(response => {
				console.log(response.data.key);
				let auth = 'Token ' + response.data.key;
				this.setState({ AUTH_TOKEN: auth });
			})
			.catch(error => {
				console.log(error);
			});
	};

	handleChange = name => event => {
		this.setState({ ...this.state, [name]: event.target.value });
		console.log('THis works?');
	};

	handleChangeRadio = event => {
		this.setState({ createDigs: event.target.value });
	};

	handleAutoComplete = input => {
		this.setState({ joiningDigs: input });
	};

	handleCheckBox = e => {
		console.log('you clicked something there chief', e.target.checked);
		const { payed } = this.state;
		let userId = e.target.value;
		let index = payed.indexOf(userId);
		if (index !== -1) {
			payed.splice(index, 1);
		} else {
			payed.push(userId);
		}

		this.setState({ payed });

		console.log(payed);
	};

	updatePayments = () => {
		const { expenses, payed } = this.state;
		//let index = payed.indexOf(',');
		//let newArray=item.splice()
		let payedExpenses = payed.map(payer => {
			let expense = payer.split(',');
			return expense[1];
		});

		let expensePayer = payed.map(payer => {
			let expense = payer.split(',');
			return expense[0];
		});
		let filteredExpense = expenses.filter(expense => {
			return payedExpenses.indexOf(expense.name) !== -1;
		});
		let indexes = [];
		expenses.map((filtered, index) => {
			filteredExpense.map(fil => {
				if (fil.name == filtered.name) {
					indexes.push(index);
				}
				return fil.name;
			});
		});

		expensePayer.map(payer => {
			indexes.map((indexes, index) => {
				console.log(expenses[indexes].membersOwing.indexOf(parseInt(payer)));
				let amountPerPayer =
					expenses[indexes].amount / expenses[indexes].membersOwing.length;
				expenses[indexes].membersOwing.splice(
					expenses[indexes].membersOwing.indexOf(parseInt(payer)),
					1
				);
				expenses[indexes].amount = Math.round(
					((expenses[indexes].amount - amountPerPayer) * 100) / 100
				);
			});
		});

		this.setState({ expenses, payed: [] });
		console.log(filteredExpense, indexes, expenses, expensePayer);
		payedExpenses = [];
		expensePayer = [];
		filteredExpense = [];
		indexes = [];

		console.log(filteredExpense, indexes, expenses, expensePayer);
	};

	handleAddExpense = () => {
		const {
			expenses,
			expensename,
			amount,
			selectedCategory,
			selectedMembers
		} = this.state;
		let expense = {
			name: expensename,
			category: selectedCategory,
			amount: amount,
			membersOwing: selectedMembers,
			ownerId: '12'
		};
		expenses.push(expense);

		this.setState({ expenses });
		this.handleDialog();
	};

	handleDialog = () => {
		this.setState(prevState => ({
			isDialogOpen: !prevState.isDialogOpen
		}));
	};
	componentDidMount() {
		this.setState({ path: window.location.href });
	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<TemplatePage
						drawer={this.state.drawer}
						toggleDrawer={this.toggleDrawer}
						path={this.state.path}
						currentPath={this.currentPath}
					>
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
										signIn={this.signIn}
									/>
								)}
							/>
							<Route
								exact
								path="/signup"
								render={props => (
									<Signup
										{...props}
										usernameSignUp={this.state.usernameSignUp}
										emailSignUp={this.state.emailSignUp}
										passwordSignUp={this.state.passwordSignUp}
										passwordSignUpConfirm={this.state.passwordSignUpConfirm}
										handleChange={this.handleChange}
										handleChangeRadio={this.handleChangeRadio}
										createDigs={this.state.createDigs}
										handleAutoComplete={this.handleAutoComplete}
										digs={this.state.digs}
										signUp={this.signUp}
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
										expensename={this.state.expensename}
										amount={this.state.amount}
										members={this.state.members}
										categoriesList={this.state.categoriesList}
										selectedCategory={this.state.selectedCategory}
										handleCheckBox={this.handleCheckBox}
										updatePayments={this.updatePayments}
										handleAddExpense={this.handleAddExpense}
										handleDialog={this.handleDialog}
										handleChange={this.handleChange}
										handleChangeSelect={this.handleChangeSelect}
										open={this.state.isDialogOpen}
										selectedMembers={this.state.selectedMembers}
									/>
								)}
							/>
						</Switch>
					</TemplatePage>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
