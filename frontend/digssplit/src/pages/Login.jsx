import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { KeyboardArrowLeft } from '@material-ui/icons';

import CustomButton from './../components/Button';
import Textfield from './../components/Textfield';

import logoblack from './../img/digssplit_logo_black.png';
import { Button } from '@material-ui/core';

export default function Login(props) {
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
                    <Textfield placeholder={"Email address"} />
					{console.log(styles.logo)}
				</Grid>
			</Grid>
		</div>
	);
}
