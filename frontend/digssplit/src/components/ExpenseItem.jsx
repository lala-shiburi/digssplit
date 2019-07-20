import React from 'react';
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	Divider,
	Grid
} from '@material-ui/core';

import CheckBox from './../components/CheckBox';

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
	}
};

export default function ExpenseItem(props) {
	const { category, expenses,handleCheckBox } = props;
	const filtered = (category, expenses) => {
		let filtered = expenses.filter(expense => expense.category === category);
		return filtered;
	};

	return (
		<React.Fragment>
			{filtered(category, expenses).map(items => (
				<Card>
					<CardContent>
						<Typography varient="h5" style={styles.expenseName}>
							{items.name}
						</Typography>
						<Typography varient="h6">Amount: R{items.amount}</Typography>
						<Typography varient="h6" style={styles.debtors}>
							Debtors
						</Typography>
						<Divider style={styles.divider} varient="middle" />
						{items.membersOwing.map((member, index) => (
							<React.Fragment>
								<CheckBox
									member={member}
									item={items.name}
									handleCheckBox={handleCheckBox}
									index={index}
								/>
							</React.Fragment>
						))}
						<Grid item>
							Each owes you R
							{Math.round((items.amount / items.membersOwing.length) * 100) /
								100}
						</Grid>
						<Grid item><Button>Update payments</Button></Grid>
					</CardContent>
					<CardActions>
						<Button>Delete</Button>
					</CardActions>
				</Card>
			))}
		</React.Fragment>
	);
}
