import React from 'react';
import {
	Box,
	Grid,
	Button,
	Divider,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormControl,
	FormHelperText,
	Input,
	makeStyles
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {
	KeyboardArrowLeft,
	Email,
	LockOutlined,
	Home,
	Person
} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import 'typeface-roboto';

import CustomButton from './../components/Button';
import Loader from './../components/loader';
import Textfield from './../components/Textfield';
import LinkButton from './../components/LinkButton';
import AutoComplete from './../components/AutoComplete';
import logoblack from './../img/digssplit_logo_black.png';

const useStyles = makeStyles({
	underline: {
		'&:before': {
			borderBottomColor: 'rgb(73, 80, 87)'
		},
		'&:after': {
			borderBottomColor: '#e91e63'
		},
		'&:hover:not(.Mui-disabled):before': {
			borderBottomColor: '#e91e63'
		}
	}
});

export default function Signup(props) {
	const classes = useStyles();
	const {
		handleChange,
		emailSignUp,
		passwordSignUp,
		passwordSignUpConfirm,
		usernameSignUp,
		handleChangeRadio,
		createDigs,
		handleAutoComplete,
		digs,
		signUp,
		suggestions,
		handleSubmit,
		error,
		loading,
		AUTHENTICATED
	} = props;

	const doesDigsExist = digs => {
		const currentDigs = suggestions.filter(
			suggestion => suggestion.label === digs
		);
		return currentDigs;
	};

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

	if (AUTHENTICATED) {
		return <Redirect push to="/expenses" />;
	} else {
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

				{loading ? <Loader /> : null}

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
					<form style={{ margin: '0 auto' }} onSubmit={handleSubmit}>
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
									<FormControl>
										<Input
											name="digs"
											classes={{ underline: classes.underline }}
											placeholder={'Enter digs name'}
											value={digs}
											required
											onChange={handleChange}
										/>
										{doesDigsExist(digs).length ? (
											<FormHelperText error id="my-helper-text">
												Ahh that name is already taken hey
											</FormHelperText>
										) : null}
									</FormControl>
								) : (
									<AutoComplete
										required
										classesUnderline={{ underline: classes.underline }}
										suggestions={suggestions}
										handleAutoComplete={handleAutoComplete}
									/>
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
								<Person style={styles.icon} />
							</Grid>

							<Grid item>
								<FormControl>
									<Input
										name="usernameSignUp"
										required
										placeholder={'username'}
										classes={{ underline: classes.underline }}
										value={usernameSignUp}
										onChange={handleChange}
									/>
								</FormControl>
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
								<FormControl>
									<Input
										name="emailSignUp"
										placeholder={'Email address'}
										classes={{ underline: classes.underline }}
										required
										type="email"
										value={emailSignUp}
										onChange={handleChange}
									/>
									{error.email ? (
										<FormHelperText error id="my-helper-text">
											{error.email}
										</FormHelperText>
									) : null}
								</FormControl>
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
								<FormControl>
									<Input
										name="passwordSignUp"
										classes={{ underline: classes.underline }}
										placeholder={'Password'}
										type="password"
										required
										value={passwordSignUp}
										onChange={handleChange}
									/>
									{error.password1 ? (
										<FormHelperText error id="my-helper-text">
											{error.password1}
										</FormHelperText>
									) : null}
								</FormControl>
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
								<FormControl>
									<Input
										name="passwordSignUpConfirm"
										classes={{ underline: classes.underline }}
										placeholder={'Password (again)'}
										type="password"
										required
										value={passwordSignUpConfirm}
										onChange={handleChange}
									/>
									{error.password ? (
										<FormHelperText error id="my-helper-text">
											{error.password}
										</FormHelperText>
									) : null}
								</FormControl>
							</Grid>
						</Grid>

						<Grid Item xs={12}>
							{/* <LinkButton
							onClick={signUp}
							style={styles.signInButton}
							to="/expenses"
						>
							Sign up
						</LinkButton> */}
							<CustomButton
								disabled={doesDigsExist(digs).length ? true : false}
								type="submit"
								style={styles.signInButton}
								text={'Sign up'}
							/>
						</Grid>
					</form>

					<Grid item xs={12}>
						<Divider variant="middle" style={styles.divider} />
					</Grid>
					<Grid item style={styles.caption}>
						<Typography variant="caption" display="block" gutterBottom>
							Already have an account? then please{' '}
							<span style={styles.span}>
								<NavLink style={styles.span} to="/login">
									sign in here
								</NavLink>{' '}
							</span>
						</Typography>
					</Grid>
				</Grid>
			</div>
		);
	}
}
