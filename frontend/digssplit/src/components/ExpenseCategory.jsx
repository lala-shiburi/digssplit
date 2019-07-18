import React from 'react';
import {Paper,Grid,Typography} from '@material-ui/core';
import ExpenseItem from './../components/ExpenseItem'

export default function ExpenseCategory(props) {
    const{categories,expenses}=props;
    return (
        <React.Fragment>

        
			<Grid container>
                    
                {categories.map(category=>(

                               
					<Grid item xs={12}>
                        <Paper>
                            <Typography variant="h5" gutterBottom>
                                {category}
                            </Typography>
                            <ExpenseItem category={category} expenses={expenses} />
                        </Paper>
					</Grid>
                     ))}
			
			</Grid>
        
        
       
        </React.Fragment>
    )
}
