import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
	const { handleChange, categoriesList, selectedCategory, name } = props;

	return (
		<FormControl className={classes.formControl}>
			<Select
				value={selectedCategory}
				onChange={handleChange(name)}
				name="selectedCategory"
				displayEmpty
				className={classes.selectEmpty}
			>
				<MenuItem value="" disabled>
					Select Category
				</MenuItem>
				{categoriesList.map((category,index) => (
					<MenuItem key={index} value={category}>{category}</MenuItem>
				))}
				
			</Select>
		</FormControl>
	);
}
