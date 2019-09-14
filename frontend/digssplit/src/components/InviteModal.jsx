import React, { Component } from 'react';
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

export default function InviteModal(props) {
	const {
		inviteName,
		InviteEmail,
		inviteModal,
		handleInviteModal,
		sendInvite,
		handleChange
	} = props;

	return (
		<div>
			<Dialog
				open={inviteModal}
				onClose={handleInviteModal}
				TransitionComponent={Transition}
				aria-labelledby="form-dialog-title"
				//style={styles.dialog}
				fullWidth={true}
			>
				<DialogTitle id="form-dialog-title" style={styles.dialogTitle}>
					Invite Your Digs Mate
				</DialogTitle>

				<DialogContent>
					<Textfield
						name="inviteName"
						placeholder={"What's their name?"}
						value={inviteName}
						handleChange={handleChange}
						style={styles.select}
					/>
					<Textfield
						name="inviteEmail"
						placeholder={'Their Email?'}
						value={InviteEmail}
						handleChange={handleChange}
						style={styles.select}
					/>
				</DialogContent>

				<DialogActions style={styles.dialogActions}>
					<CustomButton
						onClick={sendInvite}
						style={styles.signInButton}
						text={'Invite'}
					/>

					<CustomButton
						onClick={handleInviteModal}
						style={styles.signInButton}
						text={'Cancel'}
					/>
				</DialogActions>
			</Dialog>
		</div>
	);
}
