import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor:"#e91e63",
    color:"white"
  },
  input: {
    display: 'none',
  },

}));

export default function CustomButton(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Button onClick={props.onClick} disabled={props.disabled} type={props.type} variant="contained" className={classes.button} style={props.style}>
                {props.text}
            </Button>
            
        </React.Fragment>
    )
}
