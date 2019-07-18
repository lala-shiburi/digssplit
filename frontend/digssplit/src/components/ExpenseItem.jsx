import React from 'react';
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button
} from '@material-ui/core';

export default function ExpenseItem(props) {
	const { category, expenses } = props;
	const filtered = (category, expenses) => {
		let filtered = expenses.filter(expense => 
										expense.category === category
									
										);
		// console.log(category, expenses,filtered);
		return filtered;
	};

	return (
		<React.Fragment>
			{/* {console.log(category)}
			{console.log(expenses)}
			{console.log(filtered(category,expenses))} */}
			{filtered(category, expenses).map(items => (
				<Card>
					<CardContent>
						<Typography varient="h6">{items.name}</Typography>
						<Typography varient="h6">{items.amount}</Typography>
						<Typography varient="h6">Debtors</Typography>
						<hr />
						<Typography varient="h6">{items.membersOwing}</Typography>
					</CardContent>
					<CardActions>
						<Button>Delete</Button>
					</CardActions>
				</Card>
			))}
		</React.Fragment>
	);
}
