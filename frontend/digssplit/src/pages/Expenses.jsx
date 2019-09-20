import React from 'react';
import { Grid, Fab } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { Add, Refresh } from '@material-ui/icons/';
import 'typeface-roboto';

import { ExpenseCategory, Button, Modal } from './../components';

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
		handleDeleteExpense,
		username,
		expensename,
		amount,
		selecteddigsMates,
		AUTHENTICATED
	} = props;
	return (
		<React.Fragment>
			{AUTHENTICATED ? (
				<>
					<Grid container>
						{expenses.length ? (
							<>
								<ExpenseCategory
									checkbox={checkbox}
									updatePayments={updatePayments}
									handleCheckBox={handleCheckBox}
									username={username}
									categories={categories}
									digsMates={digsMates}
									expenses={expenses}
									handleDeleteExpense={handleDeleteExpense}
								/>
								<Grid item>
									<Button
										icon={<Refresh style={{ marginRight: '5px' }} />}
										text={'Update Payments'}
										onClick={updatePayments}
									/>
								</Grid>
							</>
						) : (
							<h4>You have no expenses</h4>
						)}
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
						<Add onClick={handleDialog} />
					</Fab>
				</>
			) : (
				<Redirect push to="/" />
			)}
		</React.Fragment>
	);
}
