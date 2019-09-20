import React, { Component } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';

import { LinkButton } from '../components';

export default class Home extends Component {
	handlesClick = ButtonEvent => {
		console.log('You clicked the signin button');
	};

	render() {
		const styles = {
			mainContainer: {
				position: 'relative',
				top: '17vh'
			},
			heading: {
				color: 'White',
				textShadow: '2px 1px 2px rgba(0, 0, 0, 0.98)',
				fontSize: '45px'
			},
			paper: {
				textAlign: 'center',
				backgroundColor: 'rgba(255,255,255,0.6)'
			},
			button: {
				fontSize: '20px'
			}
		};

		return (
			<React.Fragment>
				<Grid container style={styles.mainContainer}>
					<Grid item xs={12}>
						<Typography variant="h4" gutterBottom style={styles.heading}>
							SPLIT BILLS WITH YOUR DIGSMATES
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<Paper elevation={14} style={styles.paper}>
							<LinkButton style={styles.button} to="/login">
								LOG IN / SIGN UP
							</LinkButton>
						</Paper>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}
