import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide
} from '@material-ui/core';

import { Textfield, Button } from './../components';

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
					<Button
						onClick={sendInvite}
						style={styles.signInButton}
						text={'Invite'}
					/>

					<Button
						onClick={handleInviteModal}
						style={styles.signInButton}
						text={'Cancel'}
					/>
				</DialogActions>
			</Dialog>
		</div>
	);
}
