import React from 'react';
import {
	Input,
	MenuItem,
	FormControl,
	Select,
	makeStyles
} from '@material-ui/core';

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
	selectEmpty: {
		marginBottom: 16
	}
}));

export default function SimpleSelect(props) {
	const classes = useStyles();
	const {
		handleChange,
		categoriesList,
		selectedCategory,
		classesUnderline
	} = props;

	return (
		<FormControl className={classes.formControl}>
			<Select
				value={selectedCategory}
				onChange={handleChange}
				input={<Input classes={{ underline: classesUnderline }} />}
				name="selectedCategory"
				displayEmpty
				className={classes.selectEmpty}
			>
				<MenuItem value="" disabled>
					Select Category
				</MenuItem>
				{categoriesList.map((category, index) => (
					<MenuItem key={index} value={category}>
						{category}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
