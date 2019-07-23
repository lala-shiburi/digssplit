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
		expenses: [
			{
				name: 'Electricity',
				category: 'utilities',
				amount: 2000,
				membersOwing: [1, 2, 3],
				ownerId: '12'
			},
			{
				name: 'Uber',
				category: 'transport',
				amount: 100,
				membersOwing: [0, 1, 2],
				ownerId: '12'
			},
			{
				name: 'Black Label',
				category: 'booze',
				amount: 1000,
				membersOwing: [1, 2, 3],
				ownerId: '12'
			}
		],
		payed: [],
		isDialogOpen: false,
		expensename: '',
		amount: '',
		categoriesList: [
			'UTILITIES',
			'HOUSEHOLD ITEMS',
			'FOOD',
			'ENTERTAINMENT',
			'BOOZE',
			'LOAN SHARK'
		],
		categories: ['utilities', 'transport', 'booze'],
		selectedCategory: '',
		members: [0, 1, 2, 3, 4],
		selectedMembers:[]
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

	handleAddExpense = expense => {
		console.log(expense);
		const { expenses } = this.state;
		expenses.push(expense);
	};

	handleDialog = () => {
		this.setState(prevState => ({
			isDialogOpen: !prevState.isDialogOpen
		}));
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
					</BrowserRouter>
				</TemplatePage>
			</div>
		);
	}
}

export default App;
