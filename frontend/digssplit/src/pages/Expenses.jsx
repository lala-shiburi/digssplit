import React from 'react';
import { Grid,Button } from '@material-ui/core';
import 'typeface-roboto';

import ExpenseCategory from './../components/ExpenseCategory';

export default function Expenses(props) {
	const {
		categories,
		expenses,
		checkbox,
		handleCheckBox,
		updatePayments
	} = props;
	return (
		<React.Fragment>
			<Grid container>
				<ExpenseCategory
					checkbox={checkbox}
					updatePayments={updatePayments}
					handleCheckBox={handleCheckBox}
					categories={categories}
					expenses={expenses}
				/>
				<Grid item>
					<Button onClick={updatePayments}>Update payments</Button>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
