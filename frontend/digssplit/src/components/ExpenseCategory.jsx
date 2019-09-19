import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import ExpenseItem from './../components/ExpenseItem';

const styles = {
	category: {
		marginBottom: '10px'
	},
	heading: {
		padding: '16px 0 0 16px'
	},
	paper: {
		background: 'rgba(255, 255, 255, 0.6)',
		paddingBottom: '1px'
	}
};

export default function ExpenseCategory(props) {
	const fullCategory = firstLetter => {
		switch (firstLetter) {
			case 'U':
				return 'UTILITIES';
			case 'H':
				return 'HOUSEHOLD ITEMS';
			case 'T':
				return 'TRANSPORT';
			case 'F':
				return 'FOOD';
			case 'E':
				return 'ENTERTAINMENT';
			case 'B':
				return 'BOOZE';

			default:
				return 'LOAN SHARK';
		}
	};
	const {
		categories,
		expenses,
		checkbox,
		handleCheckBox,
		handleDeleteExpense,
		username,
		updatePayments,
		digsMates,
		confirmation,
		expenseDeleted
	} = props;
	return (
		<React.Fragment>
			{categories.map((category, index) => (
				<Grid container style={styles.category} key={index}>
					<Grid item xs={12}>
						<Paper style={styles.paper}>
							<Typography style={styles.heading} variant="h4" gutterBottom>
								{fullCategory(category)}
							</Typography>
							<ExpenseItem
								fullCategory={fullCategory}
								checkbox={checkbox}
								updatePayments={updatePayments}
								handleCheckBox={handleCheckBox}
								handleDeleteExpense={handleDeleteExpense}
								confirmation={confirmation}
								expenseDeleted={expenseDeleted}
								username={username}
								digsMates={digsMates}
								category={category}
								expenses={expenses}
							/>
						</Paper>
					</Grid>
				</Grid>
			))}
		</React.Fragment>
	);
}
