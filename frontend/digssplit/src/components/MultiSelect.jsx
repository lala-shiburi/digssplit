import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: 0,
		minWidth: 120,
		width: 182,
		maxWidth: 300
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: 2
	},
	noLabel: {
		marginBottom: 16
	}
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

const styles = {
	formControl: {}
};



function getStyles(name, personName, theme) {
	return {
		
	};
}

export default function MultipleSelect(props) {
	const classes = useStyles();
	const theme = useTheme();
	const { handleChange, name, selectedMembers, members } = props;

	return (
		<FormControl className={clsx(classes.formControl, classes.noLabel)}>
			<Select
				multiple
				displayEmpty
				value={selectedMembers}
				onChange={handleChange(name)}
				input={<Input id="select-multiple-placeholder" />}
				renderValue={selected => {
					if (selected.length === 0) {
						return <em>Select debtors</em>;
					}

					return selected.join(', ');
				}}
				MenuProps={MenuProps}
			>
				<MenuItem disabled value="">
					<em>Select debtors</em>
				</MenuItem>
				{members.map(member => (
					<MenuItem
						key={member}
						value={member}
						style={getStyles(member, member, theme)}
					>
						{member}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
