import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import ExpenseItem from './../components/ExpenseItem';

const styles = {
	category: {
		marginBottom: '10px'
	},
	heading: {
		padding: '16px 0 0 16px'
	}
};

export default function ExpenseCategory(props) {
    
	const { categories, expenses, checkbox, handleCheckBox } = props;
	return (
		<React.Fragment>
			{categories.map(category => (
				<Grid container style={styles.category}>
					<Grid item xs={12}>
						<Paper>
							<Typography style={styles.heading} variant="h4" gutterBottom>
								{category}
							</Typography>
							<ExpenseItem checkbox={checkbox}  handleCheckBox={handleCheckBox} category={category} expenses={expenses} />
                            
						
                        </Paper>
					</Grid>
				</Grid>
			))}
		</React.Fragment>
	);
}
