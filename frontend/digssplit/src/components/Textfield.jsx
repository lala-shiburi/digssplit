import React from 'react';
import {
	fade,
	withStyles,
	makeStyles,
	createMuiTheme
} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';

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
    const {placeholder,handleChange,type,value,name}=props
	return (
		<div>
			<CssTextField
				// className={classes.margin}
				id="custom-css-standard-input"
                placeholder={placeholder}
                onChange={handleChange(name)}
                value={value}
                type={type}
			/>
		</div>
	);
}
