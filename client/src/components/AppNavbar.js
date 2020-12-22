import React from "react";
import { NavLink } from "react-router-dom";

import "./styles/AppNavbar.css";
import {
	Button,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Divider,
	Drawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		color: "#e2f1f8",
	},
	title: {
		flexGrow: 1,
	},
	drawerList: {
		color: "#3F3D56",
	},
}));

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

function AppNavbar(props) {
	const classes = useStyles();

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
  });
  
  const [localStrg, setLocalStrg] = React.useState(null); 

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, classes.drawerList, {
				[classes.fullList]: anchor === "top" || anchor === "bottom",
			})}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				<ListItem button>
					<ListItemLink href="/">
						<ListItemText primary="Home" />
					</ListItemLink>
					<Divider />
				</ListItem>
				<ListItem button>
					<ListItemLink href="/students">
						<ListItemText primary="Students" />
					</ListItemLink>
					<Divider />
				</ListItem>
				<ListItem button>
					<ListItemLink href="/projects">
						<ListItemText primary="Projects" />
					</ListItemLink>
					<Divider />
				</ListItem>
				<ListItem button>
					<ListItemLink href="/leaderboard">
						<ListItemText primary="Leaderboard" />
					</ListItemLink>
					<Divider />
				</ListItem>
				{!props.isLoggedIn && (
					<React.Fragment>
						<ListItem button>
							<ListItemLink href="/signup">
								<ListItemText primary="Signup" />
							</ListItemLink>
							<Divider />
						</ListItem>
						<ListItem button>
							<ListItemLink href="/login">
								<ListItemText primary="Login" />
							</ListItemLink>
							<Divider />
						</ListItem>
					</React.Fragment>
				)}
				{props.isLoggedIn && (
					<React.Fragment>
						<ListItem button>
							<ListItemLink href="/post-project">
								<ListItemText primary="Upload" />
							</ListItemLink>
							<Divider />
						</ListItem>
						<ListItem button>
							<ListItemLink href="/logout">
								<ListItemText primary="Logout" />
							</ListItemLink>
							<Divider />
						</ListItem>
					</React.Fragment>
				)}
			</List>
		</div>
	);

	const handleLogout = () => {
    setLocalStrg(null);
		localStorage.clear();
		props.setLoggedInState(false);
	};

	return (
		<nav>
			<NavLink id="logo" to="/" className="Link">
				<h2>Project Showcase</h2>
			</NavLink>
			<ul>
				<li>
					<NavLink activeClassName="active" className="Link" to="/">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName="active" className="Link" to="/students">
						Students
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName="active" className="Link" to="/projects">
						Projects
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName="active" className="Link" to="/leaderboard">
						Leaderboard
					</NavLink>
				</li>
				{!props.isLoggedIn && (
					<React.Fragment>
						<li>
							<NavLink activeClassName="active" className="Link" to="/signup">
								Signup
							</NavLink>
						</li>
						<li>
							<NavLink activeClassName="active" className="Link" to="/login">
								Login
							</NavLink>
						</li>
					</React.Fragment>
				)}
				{props.isLoggedIn && (
					<React.Fragment>
						<li>
							<NavLink
								onClick={handleLogout}
								activeClassName="active"
								className="Link"
								to="/login"
							>
								Logout
							</NavLink>
						</li>
						<li>
							<NavLink
								activeClassName="active"
								className="Link"
								to="/post-project"
							>
								Upload
							</NavLink>
						</li>
					</React.Fragment>
				)}
			</ul>
			<div id="menu">
				{["right"].map((anchor) => (
					<React.Fragment key={anchor}>
						<Button onClick={toggleDrawer(anchor, true)}>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="white"
								aria-label="menu"
							>
								<MenuIcon />
							</IconButton>
						</Button>
						<Drawer
							anchor={anchor}
							open={state[anchor]}
							onClose={toggleDrawer(anchor, false)}
						>
							{list(anchor)}
						</Drawer>
					</React.Fragment>
				))}
			</div>
		</nav>
	);
}

export default AppNavbar;
