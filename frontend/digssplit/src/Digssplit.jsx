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
		user: '',
		email: '',
		password: '',
		usernameSignUp: '',
		emailSignUp: '',
		passwordSignUp: '',
		passwordSignUpConfirm: '',
		createDigs: 'true',
		joiningDigs: '',
		digs: '',
		existingDigs: [],
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
		categories: ['UTILITIES', 'BOOZE'],
		selectedCategory: '',
		digsMates: [0, 1, 2, 3, 4],
		selecteddigsMates: [],
		AUTH_TOKEN: '',
		AUTHENTICATED: false,
		error: ''
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

	handleSubmit(event) {
		event.preventDefault();
		alert('Your favorite flavor is: ');
	}

	signIn = async () => {
		console.log('You are trying to login');
		try {
			const signIn = await axios.post(
				'http://localhost:8000/rest-auth/login/',
				{
					email: this.state.email,
					password: this.state.password
				}
			);
			let responseKey = 'Token ' + signIn.data.key;
			// let auth = 'Token ' + response.data.key;
			// this.setState({ AUTH_TOKEN: auth }, () => {
			// 	this.getUser();
			// });

			const getUser = await axios.get('http://localhost:8000/users/current', {
				headers: { Authorization: `${responseKey}` }
			});
			let responseUser = getUser.data;

			const getDigsMates = await axios.get(
				`http://localhost:8000/users/?digs=${responseUser.digs.id}`
			);
			const digsMates = getDigsMates.data;

			const getDigsExpenses = await axios.get(
				`http://localhost:8000/expenses/?digs=${responseUser.digs.id}`
			);
			const expenses = getDigsExpenses.data;
			this.setState({
				AUTH_TOKEN: responseKey,
				AUTHENTICATED: true,
				user: responseUser,
				digsMates,
				expenses
			});
		} catch (err) {
			console.log(err.response.data.non_field_errors);
			this.setState({ error: err.response.data.non_field_errors });
		}
	};

	signUp = () => {
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
				this.setState({ AUTH_TOKEN: auth, AUTHENTICATED: true });
			})
			.catch(error => {
				console.log(error);
			});
	};

	getDigs = () => {
		axios
			.get('http://localhost:8000/digs/')
			.then(response => {
				console.log(response);
				let digsArray = response.data.map(dig => ({ label: dig.name }));
				this.setState({ existingDigs: digsArray });
			})
			.catch(error => {
				console.log(error);
			});
	};

	getUser = () => {
		axios
			.get('http://localhost:8000/users/current', {
				headers: { Authorization: `${this.state.AUTH_TOKEN}` }
			})
			.then(response => {
				console.log(response.data);
				this.setState({ user: response.data });
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

	DigsmateId = members_owing => {
		let digsMatesId = members_owing.map(digsmateUsername => {
			return this.state.digsMates.map(mate => {
				return mate.username === digsmateUsername ? mate.id : '';
			});
		});
		return digsMatesId;
	};

	handleAddExpense = () => {
		const {
			expenses,
			expensename,
			amount,
			selectedCategory,
			selecteddigsMates,
			user
		} = this.state;
		let selectedDigsMatesID = this.DigsmateId(selecteddigsMates)[0];
		console.log(selectedDigsMatesID);
		let expense = {
			name: expensename,
			amount: amount,
			category: selectedCategory.substring(0, 1),
			members_owing: selectedDigsMatesID,
			digs: user.digs.id
		};
		axios
			.post('http://localhost:8000/expenses/', expense, {
				headers: { Authorization: `${this.state.AUTH_TOKEN}` }
			})
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			});
		expenses.push(expense);

		this.setState({
			expenses,
			expensename: '',
			selectedCategory: '',
			amount: '',
			selecteddigsMates: []
		});

		this.handleDialog();
	};

	handleDialog = () => {
		this.setState(prevState => ({
			isDialogOpen: !prevState.isDialogOpen
		}));
	};
	componentDidMount() {
		this.setState({ path: window.location.href });
		this.getDigs();
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
										handleSubmit={this.handleSubmit}
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
										suggestions={this.state.existingDigs}
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
										AUTHENTICATED={this.state.AUTHENTICATED}
										checkbox={this.state.checkbox}
										expensename={this.state.expensename}
										amount={this.state.amount}
										digsMates={this.state.digsMates}
										username={this.state.user.username}
										categoriesList={this.state.categoriesList}
										selectedCategory={this.state.selectedCategory}
										handleCheckBox={this.handleCheckBox}
										updatePayments={this.updatePayments}
										handleAddExpense={this.handleAddExpense}
										handleDialog={this.handleDialog}
										handleChange={this.handleChange}
										handleChangeSelect={this.handleChangeSelect}
										open={this.state.isDialogOpen}
										selecteddigsMates={this.state.selecteddigsMates}
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
