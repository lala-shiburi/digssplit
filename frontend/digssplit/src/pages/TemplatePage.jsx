import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withRouter} from 'react-router-dom'

import TemporaryDrawer from '../components/Drawer';
import logo from './../img/digssplit_logo.png';
import logoBlack from './../img/digssplit_logo_black.png';
import backgroundImgHome from './../img/background.jpg';
import backgroundImg from './../img/tile_subtlebg.png';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		background: 'transparent'
	},
	menuButton: {
		// marginRight: theme.spacing(2),
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
	AppBar: {
		background: 'transparent',
		boxShadow: 'none'
	}
}));

 function TemplatePage(props) {
	const classes = useStyles();
	const { drawer, toggleDrawer,AUTHENTICATED,signOut } = props;
	const currentLocation=()=>(
		window.location.href
	)
	return (
		<React.Fragment>
			<CssBaseline />

			<Container
				maxWidth="lg"
				className={
					currentLocation() === 'http://localhost:3000/'
						? classes.containerHome
						: classes.containerOther
				}
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
				<TemporaryDrawer AUTHENTICATED={AUTHENTICATED} signOut={signOut} drawer={drawer} toggleDrawer={toggleDrawer} />
			</Container>
		</React.Fragment>
	);
}

export default withRouter(TemplatePage)