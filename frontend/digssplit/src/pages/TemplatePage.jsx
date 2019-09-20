import React from 'react';
import { withRouter } from 'react-router-dom';
import {
	CssBaseline,
	Container,
	makeStyles,
	AppBar,
	Toolbar,
	IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
	TemporaryDrawer,
	Loader,
	InviteModal,
	Confirmation
} from '../components/';
import { logo, logoBlack, backgroundImgHome, backgroundImg } from './../img/';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		background: 'transparent'
	},
	menuButton: {
		marginLeft: 'auto',
		color: 'black'
	},
	img: {
		marginTop: '10px'
	},
	containerHome: {
		backgroundImage: `url(${backgroundImgHome})`,
		backgroundColor: 'white',
		backgroundSize: 'cover',
		backgroundPosition: '20% 50%',
		height: '100vh'
	},
	containerOther: {
		backgroundImage: `url(${backgroundImg})`,
		backgroundColor: 'white',
		backgroundSize: 'cover',
		backgroundPosition: '20% 50%',
		height: '100vh'
	},
	containerExpenses: {
		backgroundImage: `url(${backgroundImg})`,
		backgroundColor: 'white',
		backgroundRepeat: 'repeat',
		height: '100%'
	},
	AppBar: {
		background: 'transparent',
		boxShadow: 'none'
	}
}));

function TemplatePage(props) {
	const classes = useStyles();
	const {
		drawer,
		toggleDrawer,
		AUTHENTICATED,
		signOut,
		inviteEmail,
		inviteName,
		inviteModal,
		handleInviteModal,
		sendInvite,
		handleChange,
		handleDialog,
		loading,
		clearConfirmationMsg,
		confirmationMsg
	} = props;
	const currentLocation = () => window.location.href;
	return (
		<React.Fragment>
			{loading ? (
				<Loader />
			) : confirmationMsg !== '' ? (
				<Confirmation
					confirmationMsg={confirmationMsg}
					clearConfirmationMsg={clearConfirmationMsg}
				/>
			) : null}
			<CssBaseline />

			<Container
				maxWidth="lg"
				style={loading ? { position: 'fixed' } : null}
				className={
					currentLocation() === 'http://localhost:3000/'
						? classes.containerHome
						: currentLocation() === 'http://localhost:3000/expenses'
						? classes.containerExpenses
						: classes.containerOther
				} //change background image based on the current location
			>
				<div className={classes.root}>
					<AppBar position="static" className={classes.AppBar}>
						<Toolbar disableGutters={true}>
							{window.location.href === 'http://localhost:3000/' ? (
								<img
									src={logo}
									className={classes.img}
									alt="logo"
									height="75"
									width="75"
								/>
							) : window.location.href === 'http://localhost:3000/expenses' ? (
								<img
									src={logoBlack}
									className={classes.img}
									alt="logo"
									height="75"
									width="75"
								/>
							) : (
								''
							)}
							<IconButton
								edge="start"
								className={classes.menuButton}
								aria-label="Menu"
								onClick={toggleDrawer(true)}
							>
								<MenuIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
				</div>
				{props.children}
				<TemporaryDrawer
					AUTHENTICATED={AUTHENTICATED}
					handleInviteModal={handleInviteModal}
					signOut={signOut}
					drawer={drawer}
					toggleDrawer={toggleDrawer}
					handleDialog={handleDialog}
				/>
				<InviteModal
					handleInviteModal={handleInviteModal}
					sendInvite={sendInvite}
					inviteModal={inviteModal}
					inviteName={inviteName}
					inviteEmail={inviteEmail}
					handleChange={handleChange}
				/>
			</Container>
		</React.Fragment>
	);
}

export default withRouter(TemplatePage);
