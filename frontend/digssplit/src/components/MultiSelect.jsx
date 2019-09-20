import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Input, MenuItem, FormControl, Select } from '@material-ui/core';

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

function getStyles(name, personName, theme) {
	return {};
}

export default function MultipleSelect(props) {
	const classes = useStyles();
	const theme = useTheme();
	const {
		handleChange,
		name,
		selecteddigsMates,
		digsMates,
		classesUnderline
	} = props;

	return (
		<FormControl className={clsx(classes.formControl, classes.noLabel)}>
			<Select
				multiple
				displayEmpty
				value={selecteddigsMates}
				name={name}
				onChange={handleChange}
				input={
					<Input
						id="select-multiple-placeholder"
						classes={{ underline: classesUnderline }}
					/>
				}
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
				{digsMates.map(member => (
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
