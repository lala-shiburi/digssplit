import React from 'react';
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Divider,
	Grid
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person';

import CheckBox from './../components/CheckBox';
import AlertModal from './../components/AlertModal';
const styles = {
	expenseName: {
		fontWeight: '600',
		fontSize: '19px'
	},
	debtors: {
		fontWeight: '500',
		fontSize: '17px'
	},
	divider: {
		height: '2px',
		width: '50%'
	},
	card: {
		margin: '30px 8px'
	},
	list: {
		padding: 0
	}
};

export default function ExpenseItem(props) {
	const {
		category,
		expenses,
		handleCheckBox,
		handleDeleteExpense,
		digsMates,
		username
	} = props;
	const filtered = (category, expenses) => {
		let filtered = expenses.filter(expense => expense.category === category);
		return filtered;
	};

	const DigsmateName = id => {
		let usernameArray = digsMates.filter(digsmate => {
			return digsmate.id === id;
		});
		return usernameArray[0].username;
	};

	return (
		<React.Fragment>
			{filtered(category, expenses).map((items, index) => (
				<Card style={styles.card} key={index}>
					<CardContent>
						<Typography varient="h5" style={styles.expenseName}>
							{items.name}
						</Typography>
						<Typography varient="h6">Amount: R{items.amount}</Typography>
						<Typography varient="h6" style={styles.debtors}>
							Debtors
						</Typography>
						<Divider style={styles.divider} varient="middle" />
						{items.members_owing.map((digsMate, index) => (
							<React.Fragment key={index}>
								{items.owner === username ? (
									<CheckBox
										digsMate={DigsmateName(digsMate)}
										item={items.name}
										handleCheckBox={handleCheckBox}
										index={index}
									/>
								) : (
									<List style={styles.list}>
										<ListItem>
											<ListItemIcon>
												<Person />
											</ListItemIcon>
											<ListItemText primary={DigsmateName(digsMate)} />
										</ListItem>
									</List>
								)}
							</React.Fragment>
						))}
						<Grid item>
							<Typography varient="body1">
								{items.amount === 0
									? 'Expense fully paid'
									: `Each owes ${items.owner} R
								${Math.round((items.amount / items.members_owing.length) * 100) / 100}`}
							</Typography>
						</Grid>
					</CardContent>
					{items.owner === username ? (
						<CardActions>
							<AlertModal
								id={items.id}
								handleDeleteExpense={handleDeleteExpense}
							/>
						</CardActions>
					) : (
						''
					)}
				</Card>
			))}
		</React.Fragment>
	);
}
