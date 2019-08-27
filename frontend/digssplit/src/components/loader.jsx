import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function loader() {
	const styles = {
		loading: {
			background: 'rgba(0, 0, 0, 0.8)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100vh',
			zIndex: '1',
			position: 'absolute',
			width: '100vw',
			top: '0',
			left: '0'
		}
	};
	return (
		<div style={styles.loading}>
			<CircularProgress size={70} thickness={5} color="secondary" />
		</div>
	);
}
