import React from 'react';
import { Grid, Button, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import 'typeface-roboto';

import ExpenseCategory from './../components/ExpenseCategory';
import Modal from './../components/Modal';

const styles = {
	button: {
		position: 'fixed',
		bottom: '4vh',
		right: '10vw',
		backgroundColor: '#e91e63'
	}
};
export default function Expenses(props) {
	const {
		categories,
		expenses,
		checkbox,
		handleCheckBox,
		updatePayments,
		handleChange,
		handleAddExpense,
		handleChangeSelect,
		categoriesList,
		digsMates,
		selectedCategory,
		open,
		handleDialog,
		expensename,
		amount,
		selecteddigsMates
	} = props;
	return (
		<React.Fragment>
			<Grid container>
				<ExpenseCategory
					checkbox={checkbox}
					updatePayments={updatePayments}
					handleCheckBox={handleCheckBox}
					categories={categories}
					digsMates={digsMates}
					expenses={expenses}
				/>
				<Grid item>
					<Button onClick={updatePayments}>Update payments</Button>
				</Grid>
				<Modal
					open={open}
					expensename={expensename}
					amount={amount}
					digsMates={digsMates}
					categoriesList={categoriesList}
					handleDialog={handleDialog}
					handleChange={handleChange}
					handleChangeSelect={handleChangeSelect}
					handleAddExpense={handleAddExpense}
					selectedCategory={selectedCategory}
					selecteddigsMates={selecteddigsMates}
				/>
			</Grid>
			<Fab color="primary" aria-label="Add" style={styles.button}>
				<AddIcon onClick={handleDialog} />
			</Fab>
		</React.Fragment>
	);
}
