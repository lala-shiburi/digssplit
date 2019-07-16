import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { KeyboardArrowLeft, Email, LockOutlined } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';

import CustomButton from './../components/Button';
import Textfield from './../components/Textfield';
import logoblack from './../img/digssplit_logo_black.png';

export default function Login(props) {
	const { handleChange, email, password } = props;

	const styles = {
		logo: {
			position: 'absolute',
			width: '195px',
			height: '129px',
			left: '85px',
			top: '93px'
		}
	};
	return (
		<div style={{ flexGrow: '1' }}>
			<Button
				style={{
					background: '#fafafa',
					fontSize: '12px',
					top: '15px',
					position: 'absolute'
				}}
			>
				<KeyboardArrowLeft /> BACK TO HOME
			</Button>

			<Grid
				container
				spacing={3}
				direction="row"
				alignItems="flex-start"
				justify="center"
			>
				<Grid item xs={12}>
					<Box>
						<img src={logoblack} style={styles.logo} alt="logo" />
					</Box>
				</Grid>
			</Grid>

			<Grid
				container
				alignItems="left"
				style={{
					top: '35vh',
					left: '30px',
					position: 'absolute',
					fontSize: '25px'
				}}
			>
				<Grid item xs={12}>
					<Divider
						style={{ width: '78%', marginBottom: '7px' }}
						variant="middle"
					/>
				</Grid>
				<Grid item>Sign in</Grid>
			</Grid>

			<Grid
				container
				spacing={3}
				direction="row"
				alignItems="flex-start"
				justify="center"
				style={{
					position: 'absolute',
					bottom: '27vh',
					left: '80px',
					color: '#495057'
				}}
			>
				<Grid
					container
					spacing={1}
					alignItems="flex-end"
					style={{ marginBottom: '20px' }}
				>
					<Grid item>
						<Email />
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
				<Grid container spacing={1} alignItems="flex-end">
					<Grid item>
						<LockOutlined style={{}} />
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
					<Grid
						Item
						xs={12}
						style={{ position: 'relative', left: '135px', top: '10px' }}
					>
						<CustomButton text={'Sign in'} />
					</Grid>
				</Grid>

				<Grid container>
					<Grid item>
						<Divider
							style={{
								width: '78%',
								marginBottom: '7px',
								position: 'relative',
								left: '0'
							}}
						/>
					</Grid>
					<Grid item>Don't have an account?</Grid>
					<Grid item>
						<Divider
							style={{
								width: '78%',
								marginBottom: '7px',
								position: 'relative',
								left: '0'
							}}
						/>
					</Grid>
					<Grid item>
						<CustomButton text={'SIGN UP FOR A NEW ACCOUNT'} />
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}
