import React from 'react';
import { Box, Grid, Divider, Typography, Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import 'typeface-roboto';

import LinkButton from './../components/LinkButton';
import logoblack from './../img/digssplit_logo_black.png';

export default function About(props) {
	const styles = {
		logo: {
			width: '195px',
			height: '129px',
			left: '85px',
			top: '93px'
		},
		logoContainer: {
			textAlign: 'center'
		},

		signIn: {
			paddingLeft: '15px',
			margin: '10px 0'
		},
		signInButton: {
			position: 'relative',
			left: '130px',
			marginBottom: '20px'
		},paper:{
            padding:'10px 10px'
        }
	};

	return (
		<div style={{ flexGrow: '1' }}>
			<LinkButton
				style={{
					background: '#fafafa',
					color: 'rgba(0, 0, 0, 0.87)',
					fontSize: '12px',
					top: '15px',
					position: 'absolute'
				}}
				to="/"
			>
				<KeyboardArrowLeft /> BACK TO HOME
			</LinkButton>

			<Grid container>
				<Grid item xs={12} style={styles.logoContainer}>
					<Box>
						<img src={logoblack} style={styles.logo} alt="logo" />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Divider style={styles.divider} variant="middle" />
				</Grid>
				<Grid item xs={12}>
					<Typography style={styles.signIn} variant="h5" gutterBottom>
						About
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<Divider variant="middle" style={styles.divider} />
				</Grid>

				<Grid item xs={12} style={{ textAlign: 'center' }}>
					<Paper style={styles.paper}>
						<Typography component="p">
							Digssplit is web application that aims to help digsmates who are tired
                            of the good old fridge stickers by providing an easy secure way to manage bills between mates.

						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
