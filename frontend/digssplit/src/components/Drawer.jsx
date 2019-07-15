import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Add, PersonAdd, RemoveRedEye } from '@material-ui/icons';
import MailIcon from '@material-ui/icons/Mail';

import CustomButton from './Button'

const useStyles = makeStyles({
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	}
});

export default function TemporaryDrawer(props) {
	const classes = useStyles();

	const { toggleDrawer, drawer } = props;

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
									<RemoveRedEye />
								)}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					)
				)}
			</List>
			<Divider />
			<CustomButton text={'LOG IN/SIGN UP'}  />
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
