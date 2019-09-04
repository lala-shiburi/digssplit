import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'green'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'green'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'red'
			},
			'&:hover fieldset': {
				borderColor: 'yellow'
			},
			'&.Mui-focused fieldset': {
				borderColor: 'green'
			}
		}
	}
})(TextField);

export default function Textfield(props) {
    //const classes = useStyles();
    const {placeholder,handleChange,type,value,name,style}=props
	return (
		<div>
			<CssTextField
				// className={classes.margin}
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
