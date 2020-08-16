import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";

import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import useStyles from "./styles";

const Navbar = () => {
	const classes = useStyles();
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const auth = useSelector(state => state.auth);
	const { isAuthenticated, user } = auth;
	const menuId = "primary-search-account-menu";
	const mobileMenuId = "primary-search-account-menu-mobile";

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
					>
						<MenuIcon />
					</IconButton>
					<Typography
						className={classes.title}
						variant="h6"
						noWrap
						onClick={() => history.push("/")}
					>
						Cooking blog
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>
					<div className={classes.grow} />
					{isAuthenticated ? (
						<React.Fragment>
							<div className={classes.sectionDesktop}>
								<IconButton
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								>
									<Avatar alt={user.name} src={user.avatar} />
								</IconButton>
							</div>
							<div className={classes.sectionMobile}>
								<IconButton
									aria-label="show more"
									aria-controls={mobileMenuId}
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
								>
									<MoreIcon />
								</IconButton>
							</div>
						</React.Fragment>
					) : (
						<Button
							variant="outlined"
							style={{ color: "white" }}
							startIcon={<AccountCircle />}
							component={Link}
							to={"/login"}
						>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<MobileMenu
				anchorEl={mobileMoreAnchorEl}
				id={mobileMenuId}
				onClose={handleMobileMenuClose}
			>
				<MenuItem onClick={handleProfileMenuOpen}>
					<IconButton
						aria-label="account of current user"
						aria-controls={menuId}
						aria-haspopup="true"
						color="inherit"
					>
						<Avatar
							alt={user.name}
							src={user.avatar}
							className={classes.small}
						/>
					</IconButton>
					<p>Profile</p>
				</MenuItem>
			</MobileMenu>

			<ProfileMenu
				id={menuId}
				admin={user.admin}
				anchorEl={anchorEl}
				onClose={handleMenuClose}
			/>
		</div>
	);
};

export default Navbar;
