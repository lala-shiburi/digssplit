import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Add, PersonAdd, RemoveRedEye } from '@material-ui/icons';

import LinkButton from './../components/LinkButton';

const useStyles = makeStyles({
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	},
	navlink: {
		textDecoration: 'none',
		color: 'inherit'
	}
});

export default function TemporaryDrawer(props) {
	const classes = useStyles();

	const { toggleDrawer, drawer, AUTHENTICATED, signOut } = props;

	const sideList = side => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				{['ADD AN EXPENSE', 'ADD A DIGSMATE', 'VIEW EXPENSES'].map(
					(text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index === 0 ? (
									<Add />
								) : index === 1 ? (
									<PersonAdd />
								) : (
									<NavLink className={classes.navlink} to="/expenses">
										<RemoveRedEye />
									</NavLink>
								)}
							</ListItemIcon>
							{index === 2 ? (
								<NavLink className={classes.navlink} to="/expenses">
									<ListItemText primary={text} />
								</NavLink>
							) : (
								<ListItemText primary={text} />
							)}
						</ListItem>
					)
				)}
			</List>
			<Divider />
			{AUTHENTICATED ? <LinkButton onClick={signOut} to="/login">SIGN OUT</LinkButton> :
			<LinkButton to="/login">LOG IN/SIGN UP</LinkButton>}
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
