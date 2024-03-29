import React from 'react';
import { NavLink } from 'react-router-dom';
import {
	makeStyles,
	Drawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@material-ui/core';
import { Add, PersonAdd } from '@material-ui/icons';

import LinkButton from './LinkButton';

const useStyles = makeStyles({
	list: {
		width: 250,
		marginTop: 60
	},
	fullList: {
		width: 'auto'
	},
	navlink: {
		textDecoration: 'none',
		color: 'inherit'
	},
	buttonContainer: {
		marginTop: '20px'
	}
});

export default function TemporaryDrawer(props) {
	const classes = useStyles();

	const {
		toggleDrawer,
		drawer,
		AUTHENTICATED,
		signOut,
		handleInviteModal,
		handleDialog
	} = props;

	const sideList = side => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				{AUTHENTICATED ? (
					<>
						<ListItem button onClick={handleDialog}>
							<ListItemIcon>
								<Add />
							</ListItemIcon>
							<ListItemText primary={'ADD AN EXPENSE'} />
						</ListItem>
						<ListItem button onClick={handleInviteModal}>
							<ListItemIcon>
								<PersonAdd />
							</ListItemIcon>
							<ListItemText primary={'ADD A DIGSMATE'} />
						</ListItem>
					</>
				) : (
					<>
						<ListItem>
							<NavLink to="/about" className={classes.navlink}>
								<ListItemText primary={'ABOUT DIGSSPLIT'} />
							</NavLink>
						</ListItem>
						<ListItem>
							<ListItemText primary={'SIGN IN FOR MORE OPTIONS'} />
						</ListItem>
					</>
				)}
			</List>

			<Divider />
			<div className={classes.buttonContainer}>
				{AUTHENTICATED ? (
					<LinkButton onClick={signOut} to="/login">
						SIGN OUT
					</LinkButton>
				) : (
					<LinkButton to="/login">LOG IN/SIGN UP</LinkButton>
				)}
			</div>
		</div>
	);

	return (
		<div>
			<Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
				{sideList('right')}
			</Drawer>
		</div>
	);
}
