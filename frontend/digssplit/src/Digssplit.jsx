import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Expenses from './pages/Expenses';
import TemplatePage from './pages/TemplatePage';

class App extends Component {
	state = {
		drawer: false
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
						<Route exact path="/login" component={Login} />
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
