import React from 'react';
import {
	Box,
	Grid,
	Button,
	Divider,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio
} from '@material-ui/core';
import {
	KeyboardArrowLeft,
	Email,
	LockOutlined,
	Home
} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import 'typeface-roboto';

import CustomButton from './../components/Button';
import Textfield from './../components/Textfield';
import LinkButton from './../components/LinkButton';
import AutoComplete from './../components/AutoComplete';
import logoblack from './../img/digssplit_logo_black.png';

export default function Signup(props) {
	const {
		handleChange,
		emailSignUp,
		passwordSignUp,
		passwordSignUpConfirm,
		handleChangeRadio,
		createDigs,
		handleAutoComplete,
		digs
	} = props;

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
			left: '54%',
			marginBottom: '20px'
		},
		caption: {
			margin: '15px auto',
			color: '#495057'
		},
		span: {
			color: '#e91e63',
			textDecoration: 'none'
		},
		radioButton: {
			color: '#495057'
		}
		// digs: {
		// 	margin: '15px 0 15px',
		// 	color: '#495057'
		// 	// marginLeft: '27%',
		// }
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
						Sign Up
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<RadioGroup
						aria-label="CreateDigs"
						name="CreateDigs"
						style={{ alignContent: 'center' }}
						value={createDigs}
						onChange={handleChangeRadio}
					>
						<FormControlLabel
							value="true"
							control={<Radio style={styles.radioButton} />}
							label="Create new digs"
						/>
						<FormControlLabel
							value="false"
							control={<Radio style={styles.radioButton} />}
							label="Join existing digs"
						/>
					</RadioGroup>
				</Grid>
				<Grid
					container
					alignItems="center"
					justify="center"
					spacing={1}
					style={styles.textFieldGrid}
				>
					<Grid item>
						<Home style={styles.icon} />
					</Grid>
					<Grid item>
						{createDigs === 'true' ? (
							<Textfield
								name="digs"
								placeholder={'Enter digs name'}
								value={digs}
								handleChange={handleChange}
							/>
						) : (
							<AutoComplete handleAutoComplete={handleAutoComplete} />
						)}
					</Grid>
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
							name="emailSignUp"
							placeholder={'Email address'}
							value={emailSignUp}
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
							name="passwordSignUp"
							placeholder={'Password'}
							type="password"
							value={passwordSignUp}
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
							name="passwordSignUpConfirm"
							placeholder={'Password (again)'}
							type="password"
							value={passwordSignUpConfirm}
							handleChange={handleChange}
						/>
					</Grid>
				</Grid>

				<Grid Item xs={12}>
					<CustomButton style={styles.signInButton} text={'Sign up'} />
				</Grid>

				<Grid item xs={12}>
					<Divider variant="middle" style={styles.divider} />
				</Grid>
				<Grid item style={styles.caption}>
					<Typography variant="caption" display="block" gutterBottom>
						Already have an account? then please{' '}
						<span style={styles.span}>
							<NavLink style={styles.span} to="/login">sign in here</NavLink>{' '}
						</span>
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
}
