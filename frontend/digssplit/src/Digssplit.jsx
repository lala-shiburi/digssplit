import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { Home, Login, Signup, Expenses, TemplatePage, About } from './pages';

//initialise state so you can call this function on loggout, it's a function to avoid reference copy.
const getInitialState = () => ({
	drawer: false,
	username: '',
	user: JSON.parse(localStorage.getItem('user')) || '',
	email: '',
	password: '',
	usernameSignUp: '',
	emailSignUp: '',
	passwordSignUp: '',
	passwordSignUpConfirm: '',
	createDigs: 'true',
	joiningDigs: '',
	digs: '',
	loading: false,
	existingDigs: [],
	expenses: JSON.parse(localStorage.getItem('expenses')) || '',
	path: '',
	payed: [],
	isDialogOpen: false,
	expensename: '',
	amount: '',

	categories: JSON.parse(localStorage.getItem('categories')) || [],
	selectedCategory: '',
	digsMates: JSON.parse(localStorage.getItem('digsMates')) || [0, 1, 2, 3, 4],
	selecteddigsMates: [],
	AUTH_TOKEN: localStorage.getItem('AUTH_TOKEN') || '',
	AUTHENTICATED: localStorage.getItem('AUTHENTICATED') || false,
	error: '',
	inviteModal: false,
	inviteName: '',
	inviteEmail: '',
	expenseDeleted: false,
	confirmationMsg: ''
});

//catogories of our expenses, it's important that they match the backend categories
const categoriesList = [
	'UTILITIES',
	'HOUSEHOLD ITEMS',
	'TRANSPORT',
	'FOOD',
	'ENTERTAINMENT',
	'BOOZE',
	'LOAN SHARK'
];

class App extends Component {
	state = getInitialState();

	toggleDrawer = open => event => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		this.setState({ drawer: open });
	};

	//called when login button is pressed
	handleSubmitSignIn = event => {
		event.preventDefault();
		this.setState({ loading: true });
		this.signIn(); //call the actual signIn function
	};

	//called when signup button is pressed
	handleSubmitSignUp = event => {
		event.preventDefault();
		const { passwordSignUp, passwordSignUpConfirm } = this.state;
		//check if passwords match before calling signup function
		if (passwordSignUp === passwordSignUpConfirm) {
			this.setState({ loading: true });
			this.signUp(); //call the actual signUp function
		} else {
			this.setState({ error: { password: "The passwords don't match" } });
		}
	};

	//clears cofirmation message 
	clearConfirmationMsg = () => this.setState({ confirmationMsg: '' });


	signIn = async () => {
		try {
			const signIn = await axios.post(
				'http://localhost:8000/rest-auth/login/',
				{
					email: this.state.email,
					password: this.state.password
				}
			);
			let responseKey = 'Token ' + signIn.data.key; //store key to use on requests

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
			const categories = [
				...new Set(expenses.map(expense => expense.category))
			]; // get all categories from the expenses

			this.setState({
				AUTH_TOKEN: responseKey,
				AUTHENTICATED: true,
				user: responseUser,
				digsMates,
				expenses,
				categories,
				loading: false
			});

			//store items that are going to be needed in localStorage to persist state even if user refreshes/close browser
			localStorage.setItem('AUTH_TOKEN', responseKey);
			localStorage.setItem('categories', JSON.stringify(categories));
			localStorage.setItem('AUTHENTICATED', true);
			localStorage.setItem('user', JSON.stringify(responseUser));
			localStorage.setItem('digsMates', JSON.stringify(digsMates));
			localStorage.setItem('expenses', JSON.stringify(expenses));
		} catch (err) {
			this.setState({ error: err.response.data, loading: false }); //pass any errors to the state
		}
	};

	signUp = async () => {
		try {
			const signUp = await axios.post(
				'http://localhost:8000/rest-auth/registration/',
				{
					username: this.state.usernameSignUp,
					email: this.state.emailSignUp,
					password1: this.state.passwordSignUp,
					password2: this.state.passwordSignUpConfirm,
					digs: {
						name: this.state.joiningDigs
							? this.state.joiningDigs
							: this.state.digs
					}
				}
			);

			let responseKey = 'Token ' + signUp.data.key;
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
			const categories = [
				...new Set(expenses.map(expense => expense.category))
			];
			this.setState({
				AUTH_TOKEN: responseKey,
				AUTHENTICATED: true,
				user: responseUser,
				digsMates,
				expenses,
				categories,
				loading: false
			});
			localStorage.setItem('AUTH_TOKEN', responseKey);
			localStorage.setItem('categories', JSON.stringify(categories));
			localStorage.setItem('AUTHENTICATED', true);
			localStorage.setItem('user', JSON.stringify(responseUser));
			localStorage.setItem('digsMates', JSON.stringify(digsMates));
			localStorage.setItem('expenses', JSON.stringify(expenses));
		} catch (error) {
			console.log(error);
			this.setState({ error: error.response.data, loading: false });
		}
	};

	getDigs = () => {
		axios
			.get('http://localhost:8000/digs/')
			.then(response => {
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
				this.setState({ user: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	};

	signOut = () => {
		localStorage.clear();
		this.setState(getInitialState());
	};

	handleChange = event => {
		let name = event.target.name;
		this.setState({ ...this.state, [name]: event.target.value });
	};

	handleChangeRadio = event => {
		this.setState({ createDigs: event.target.value });
	};

	handleAutoComplete = input => {
		this.setState({ joiningDigs: input });
	};

	handleCheckBox = e => {
		const { payed } = this.state;
		let userId = e.target.value;
		let index = payed.indexOf(userId);
		//check if the it's already selected else add it to the payed array
		if (index !== -1) {
			payed.splice(index, 1);
		} else {
			payed.push(userId);
		}

		this.setState({ payed });
	};

	handleInviteModal = () => {
		this.setState(prevState => ({
			inviteModal: !prevState.inviteModal
		}));
	};

	sendInvite = () => {
		const { inviteName, inviteEmail } = this.state;
		this.setState({ loading: true, inviteModal: false });
		const message = `You are being invited by ${
			this.state.user.username
		} to join digssplit, go to
		www.digssplit.herokuapp.com/signup and search for ${this.state.user.digs.name.toUpperCase()} to sign up and join your mate.`;
		let invite = { name: inviteName, email: inviteEmail, message: message };
		axios
			.post('http://localhost:8000/invite/', invite, {
				headers: { Authorization: `${this.state.AUTH_TOKEN}` }
			})
			.then(response => {
				this.setState({
					inviteName: '',
					inviteEmail: '',
					loading: false,
					confirmationMsg: `${inviteName} was invited succefully`
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	//returns the digsmates id given the name of the user
	digsMateId = name => {
		let userIdArray = this.state.digsMates.filter(digsmate => {
			return digsmate.username === name;
		});
		return userIdArray[0].id;
	};

	//updates expenses when digmates who have payed are selected
	updatePayments = () => {
		window.scrollTo(0, 0);
		const { expenses, payed } = this.state;
		this.setState({ loading: true });

		//get the expenses name from state payed which looks like ['username,expensename']
		let payedExpenses = payed.map(payer => {
			let expense = payer.split(',');
			return expense[1];
		});
		//get the usernames of the selected digsmates from payed state
		let expensePayer = payed.map(payer => {
			let expense = payer.split(',');
			return expense[0];
		});

		//get the expenses from state using the names of the expenses
		let filteredExpense = expenses.filter(expense => {
			return payedExpenses.indexOf(expense.name) !== -1;
		});
		let filteredExpenses = [];
		payedExpenses.map(payed => {
			for (let i = 0; i < expenses.length; i++) {
				if (expenses[i].name === payed) {
					filteredExpenses.push(expenses[i]);
				}
			}
			return null;
		});

		//get indexes of the payed expenses from state and store them indexes array
		let indexes = [];
		expenses.map((expense, index) => {
			filteredExpenses.map(filtered => {
				if (filtered.name === expense.name) {
					indexes.push(index);
				}
				return null;
			});
			return null;
		});
		expensePayer.map((payer, index) => {
			let expense = expenses[indexes[index]];
			let amountPerPayer = expense.amount / expense.members_owing.length;
			let indexOfId = expense.members_owing.indexOf(this.digsMateId(payer));
			if (indexOfId !== -1) {
				expense.members_owing.splice(indexOfId, 1);
				expense.amount = Math.round(
					((expense.amount - amountPerPayer) * 100) / 100
				);
				axios
					.put(`http://localhost:8000/expenses/${expense.id}/`, expense, {
						headers: { Authorization: `${this.state.AUTH_TOKEN}` }
					})
					.then(response => {
						expenses[indexes[index]] = expense;
						this.setState(
							{
								expenses,
								payed: [],
								loading: false,
								confirmationMsg: `Expenses Updated`
							},
							() =>
								localStorage.setItem(
									'expenses',
									JSON.stringify(this.state.expenses)
								)
						);
					})
					.catch(error => {
						console.log(error);
					});
			}
			return null;
		});

		payedExpenses = [];
		expensePayer = [];
		filteredExpense = [];
		indexes = [];
	};

	DigsmateId = members_owing => {
		let digsMatesId = members_owing.map(digsmateUsername => {
			let filterId = this.state.digsMates.filter(mate => {
				return mate.username === digsmateUsername ? mate.id : '';
			});
			return filterId[0].id;
		});
		return digsMatesId;
	};

	handleDeleteExpense = id => {
		const { expenses } = this.state;
		this.setState({ loading: true });
		const index = expenses.findIndex(expense => expense.id === id);
		expenses.splice(index, 1);

		axios
			.delete(`http://localhost:8000/expenses/${id}`, {
				headers: { Authorization: `${this.state.AUTH_TOKEN}` }
			})
			.then(response => {
				this.setState(
					{ expenses, loading: false, confirmationMsg: 'Expense Deleted' },
					() =>
						localStorage.setItem(
							'expenses',
							JSON.stringify(this.state.expenses)
						)
				);
			})
			.catch(error => {
				console.log(error);
			});
	};

	handleAddExpense = () => {
		const {
			expenses,
			expensename,
			amount,
			selectedCategory,
			selecteddigsMates,
			user,
			categories
		} = this.state;
		this.setState({ loading: true });
		let selectedDigsMatesID = this.DigsmateId(selecteddigsMates);

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
				expenses.push(response.data);
				categories.push(response.data.category);

				this.setState(
					{
						expenses,
						expensename: '',
						selectedCategory: '',
						amount: '',
						selecteddigsMates: [],
						categories,
						loading: false,
						confirmationMsg: 'Expense Added'
					},
					() => {
						localStorage.setItem(
							'expenses',
							JSON.stringify(this.state.expenses)
						);
						localStorage.setItem(
							'categories',
							JSON.stringify(this.state.categories)
						);
					}
				);
			})
			.catch(error => {
				console.log(error);
			});

		this.handleDialog();
	};

	handleDialog = () => {
		this.setState(prevState => ({
			isDialogOpen: !prevState.isDialogOpen
		}));
	};

	componentDidMount() {
		this.getDigs();
	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<TemplatePage
						drawer={this.state.drawer}
						inviteEmail={this.state.inviteEmail}
						inviteName={this.state.inviteName}
						inviteModal={this.state.inviteModal}
						handleInviteModal={this.handleInviteModal}
						sendInvite={this.sendInvite}
						toggleDrawer={this.toggleDrawer}
						handleChange={this.handleChange}
						AUTHENTICATED={this.state.AUTHENTICATED}
						signOut={this.signOut}
						loading={this.state.loading}
						confirmationMsg={this.state.confirmationMsg}
						clearConfirmationMsg={this.clearConfirmationMsg}
						handleDialog={this.handleDialog}
						
					>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route
								exact
								path="/login"
								render={props => (
									<Login
										{...props}
										email={this.state.email}
										password={this.state.password}
										AUTHENTICATED={this.state.AUTHENTICATED}
										handleChange={this.handleChange}
										handleSubmit={this.handleSubmitSignIn}
										error={this.state.error}
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
										error={this.state.error}
										loading={this.state.loading}
										AUTHENTICATED={this.state.AUTHENTICATED}
										digs={this.state.digs}
										suggestions={this.state.existingDigs}
										handleSubmit={this.handleSubmitSignUp}
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
										categoriesList={categoriesList}
										selectedCategory={this.state.selectedCategory}
										handleCheckBox={this.handleCheckBox}
										updatePayments={this.updatePayments}
										handleAddExpense={this.handleAddExpense}
										handleDialog={this.handleDialog}
										handleDeleteExpense={this.handleDeleteExpense}
										handleChange={this.handleChange}
										handleChangeSelect={this.handleChangeSelect}
										open={this.state.isDialogOpen}
										selecteddigsMates={this.state.selecteddigsMates}
										confirmation={this.confirmation}
										expenseDeleted={this.state.expenseDeleted}
									/>
								)}
							/>
							<Route
								exact
								path="/about"
								render={props => <About {...props} />}
							/>
						</Switch>
					</TemplatePage>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
