import React from 'react';
import {
	Dialog,
	makeStyles,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide
} from '@material-ui/core';

import { Textfield, Select, MultiSelect, Button } from './../components';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="left" ref={ref} {...props} />;
});
const useStyles = makeStyles({
	underline: {
		'&:before': {
			borderBottomColor: 'rgb(73, 80, 87)'
		},
		'&:after': {
			borderBottomColor: '#e91e63'
		},
		'&:hover:not(.Mui-disabled):before': {
			borderBottomColor: '#e91e63'
		}
	}
});

const styles = {
	select: {
		marginBottom: '16px',
		width: '220'
	},
	dialogTitle: {
		padding: '16px 24px 8px 24px'
	},
	dialogActions: {
		justifyContent: 'center'
	},
	dialog: {
		height: '385px',
		width: '265px'
	}
};

export default function FormDialog(props) {
	const classes = useStyles();
	const {
		handleDialog,
		open,
		handleChange,
		handleAddExpense,
		expensename,
		amount,
		categoriesList,
		digsMates,
		selectedCategory,
		selecteddigsMates
	} = props;
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleDialog}
				TransitionComponent={Transition}
				aria-labelledby="form-dialog-title"
				//style={styles.dialog}
				fullWidth={true}
			>
				<DialogTitle id="form-dialog-title" style={styles.dialogTitle}>
					Add new expense
				</DialogTitle>
				{digsMates.length > 1 ? (
					<DialogContent>
						<Select
							handleChange={handleChange}
							classesUnderline={classes.underline}
							name="selectedCategory"
							categoriesList={categoriesList}
							selectedCategory={selectedCategory}
						/>

						<Textfield
							name="expensename"
							placeholder={'Name E.g Electricity'}
							value={expensename}
							handleChange={handleChange}
							style={styles.select}
						/>
						<Textfield
							name="amount"
							placeholder={'Amount E.g 300'}
							value={amount}
							handleChange={handleChange}
							style={styles.select}
						/>

						<MultiSelect
							selecteddigsMates={selecteddigsMates}
							classesUnderline={classes.underline}
							name="selecteddigsMates"
							handleChange={handleChange}
							digsMates={digsMates.map(member => member.username)}
						/>
					</DialogContent>
				) : (
					<DialogContent>
						<h4>Hey, please get some friends so they can owe you</h4>
					</DialogContent>
				)}

				<DialogActions style={styles.dialogActions}>
					{digsMates.length > 1 ? (
						<Button
							onClick={handleAddExpense}
							style={styles.signInButton}
							text={'Save'}
						/>
					) : null}
					<Button
						onClick={handleDialog}
						style={styles.signInButton}
						text={'Cancel'}
					/>
				</DialogActions>
			</Dialog>
		</div>
	);
}
