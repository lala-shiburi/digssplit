import React, { Component } from 'react';
import {
	Paper,
	Grid,
	Button,
	Divider,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio
} from '@material-ui/core';
import {
	KeyboardArrowLeft,
	Email,
	LockOutlined,
	Home
} from '@material-ui/icons';
import 'typeface-roboto';

import ExpenseCategory from './../components/ExpenseCategory'

export default function Expenses(props) {
	const { categories, expenses } = props;
	return (
		<React.Fragment>
			<Grid container>
                <ExpenseCategory categories={categories} expenses={expenses} />
            </Grid>
		</React.Fragment>
	);
}
