import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
	root: {
		'& .MuiInput-focused': {
			color: '#e91e63'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#e91e63'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'red'
			},
			'&:hover fieldset': {
				borderColor: '#e91e63'
			},
			'&.Mui-focused fieldset': {
				borderColor: '#e91e63'
			}
		}
	}
})(TextField);

export default function Textfield(props) {
	const { placeholder, handleChange, type, value, name, style } = props;
	return (
		<div>
			<CssTextField
				style={style}
				id="custom-css-standard-input"
				placeholder={placeholder}
				onChange={handleChange}
				name={name}
				value={value}
				type={type}
			/>
		</div>
	);
}
