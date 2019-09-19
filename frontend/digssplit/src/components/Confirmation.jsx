import React from 'react';
import Check from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';

export default function confirmation(props) {
	const styles = {
		confirm: {
			background: 'rgba(0, 0, 0, 0.8)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: '25vh',
			borderRadius: '20px',
			zIndex: '1',
			position: 'absolute',
			width: '65vw',
			left: '17vw',
			top: '50vw',
			flexDirection: 'column'
		},
		checkDiv: {
			display: 'block'
		},
		check: {
			height: '40px',
			width: '40px'
		}
	};
	const clearConfirm = setTimeout(() => props.clearConfirmationMsg(), 10000);
	return (
		<div style={styles.confirm}>
			<div style={styles.checkDiv}>
				<Check style={styles.check} color="secondary" />
			</div>
			<div>
				<Typography color="secondary" variant="h5">
					{props.confirmationMsg}
				</Typography>
			</div>
		</div>
	);
}
