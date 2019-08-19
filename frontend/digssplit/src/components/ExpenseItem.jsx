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
	const { category, expenses, handleCheckBox, digsMates } = props;
	const filtered = (category, expenses) => {
		let filtered = expenses.filter(
			expense => fullCategory(expense.category) === category
		);
		console.log(filtered);
		return filtered;
	};

	const fullCategory = firstLetter => {
		switch (firstLetter) {
			case 'U':
				return 'UTILITIES';
				break;
			case 'H':
				return 'HOUSEHOLD ITEMS';
				break;
			case 'T':
				return 'TRANSPORT';
				break;
			case 'F':
				return 'FOOD';
				break;
			case 'E':
				return 'ENTERTAINMENT';
				break;
			case 'B':
				return 'BOOZE';
				break;

			default:
				return 'LOAN SHARK';
				break;
		}
	};

	const DigsmateName = id => {
		let usernameArray=digsMates.map(digsmate => {
			console.log('username',digsmate.username,'id',digsmate.id,'given',id);
			console.log(digsmate.id===id);
			return digsmate.id === id ? digsmate.username : '';
		});
		console.log(usernameArray)
		return usernameArray[0]
	
	};

	return (
		<React.Fragment>
			{filtered(category, expenses).map((items, index) => (
				<Card key={index}>
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
								<CheckBox
									digsMate={DigsmateName(digsMate)}
									item={items.name}
									handleCheckBox={handleCheckBox}
									index={index}
								/>
							</React.Fragment>
						))}
						<Grid item>
							Each owes you R
							{Math.round((items.amount / items.members_owing.length) * 100) /
								100}
						</Grid>
					</CardContent>
					<CardActions>
						<Button>Delete</Button>
					</CardActions>
				</Card>
			))}
		</React.Fragment>
	);
}
