import React from 'react';
import {Grid} from '@material-ui/core';
import 'typeface-roboto';

import ExpenseCategory from './../components/ExpenseCategory'

export default function Expenses(props) {
	const { categories, expenses,checkbox,handleCheckBox } = props;
	return (
		<React.Fragment>
			<Grid container>
                <ExpenseCategory checkbox={checkbox}  handleCheckBox={handleCheckBox}  categories={categories} expenses={expenses} />
            </Grid>
		</React.Fragment>
	);
}
