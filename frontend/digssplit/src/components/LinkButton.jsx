import React from 'react';
import { withRouter } from 'react-router';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
		backgroundColor: '#e91e63',
		padding:'6px 16px',
		color: 'white'
	},
	input: {
		display: 'none'
	}
}));

const LinkButton = props => {
	const classes = useStyles();
	const {
		history,
		location,
		match,
		staticContext,
		to,
		onClick,
		// ⬆ filtering out props that `button` doesn’t know what to do with.
		...rest
	} = props;
	return (
		<Button
			{...rest} // `children` is just another prop!
			className={classes.button}
			onClick={event => {
				onClick && onClick(event);
				history.push(to);
			}}
		/>
	);
};

export default withRouter(LinkButton);
