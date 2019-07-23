import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Textfield from './../components/Textfield';
import Select from './../components/Select';
import MultiSelect from './../components/MultiSelect';
import CustomButton from './../components/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="left" ref={ref} {...props} />;
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
	const {
		handleDialog,
		open,
		handleChange,
		handleChangeSelect,
		expensename,
		amount,
		categoriesList,
		members,
		selectedCategory,
		selectedMembers
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
				<DialogContent>
					<Select
						handleChange={handleChange}
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
						selectedMembers={selectedMembers}
						name="selectedMembers"
						handleChange={handleChange}
						members={members}
					/>
				</DialogContent>
				<DialogActions style={styles.dialogActions}>
					<CustomButton
						onClick={handleDialog}
						style={styles.signInButton}
						text={'Save'}
					/>
					<CustomButton
						onClick={handleDialog}
						style={styles.signInButton}
						text={'Cancel'}
					/>
				</DialogActions>
			</Dialog>
		</div>
	);
}
