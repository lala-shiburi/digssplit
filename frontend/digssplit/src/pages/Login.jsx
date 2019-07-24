import React from 'react';
import { Box, Grid, Button, Divider, Typography } from '@material-ui/core';
import { KeyboardArrowLeft, Email, LockOutlined } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import 'typeface-roboto';

import LinkButton from './../components/LinkButton';
import CustomButton from './../components/Button';
import Textfield from './../components/Textfield';
import logoblack from './../img/digssplit_logo_black.png';

export default function Login(props) {
	const { handleChange, email, password } = props;

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
		textFieldGrid: {
			color: '#495057',
			margin: '9px 0'
		},
		icon: {
			position: 'relative',
			top: '2px'
		},
		signInButton: {
			position: 'relative',
			left: '180px',
			marginBottom: '20px'
		},
		caption: {
			margin: '15px auto',
			color: '#495057'
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
						Sign in
					</Typography>
				</Grid>

				<Grid
					container
					alignItems="center"
					justify="center"
					spacing={1}
					style={styles.textFieldGrid}
				>
					<Grid item>
						<Email style={styles.icon} />
					</Grid>

					<Grid item>
						<Textfield
							name="email"
							placeholder={'Email address'}
							value={email}
							handleChange={handleChange}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					justify="center"
					spacing={1}
					style={styles.textFieldGrid}
				>
					<Grid item>
						<LockOutlined style={styles.icon} />
					</Grid>

					<Grid item>
						<Textfield
							name="password"
							placeholder={'Password'}
							type="password"
							value={password}
							handleChange={handleChange}
						/>
					</Grid>
				</Grid>

				<Grid Item xs={12}>
					<CustomButton style={styles.signInButton} text={'Sign in'} />
				</Grid>

				<Grid item xs={12}>
					<Divider variant="middle" style={styles.divider} />
				</Grid>
				<Grid item style={styles.caption}>
					<Typography variant="caption" display="block" gutterBottom>
						Don't have an account?
					</Typography>
				</Grid>

				<Grid item xs={12} style={{ textAlign: 'center' }}>
					<LinkButton to='/signup'>SIGN UP FOR A NEW ACCOUNT</LinkButton>
				</Grid>
			</Grid>
		</div>
	);
}
