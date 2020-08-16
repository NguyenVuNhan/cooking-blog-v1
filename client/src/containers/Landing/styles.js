import { makeStyles } from "@material-ui/core/styles";
import background from "image/landing.jpg";

const useStyles = makeStyles(theme => ({
	background: {
		position: "relative",
		backgroundImage: `url(${background})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		height: "100vh",
		margin: 0
	},
	flexContainer: {
		height: "100%",
		padding: 0,
		margin: 0,
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	row: {
		width: "auto",
		border: "1px solid blue"
	},
	title: {
		color: theme.palette.common.white
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.common.white,
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		marginLeft: 0,
		marginRight: 0,
		width: "100%"
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	inputRoot: {
		color: "inherit"
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%"
	},
	carousel: {
		position: "relative",
		top: "auto",
		right: "auto",
		bottom: "auto",
		left: "auto",
		maxWidth: "100%",
		width: "auto",
		margin: "0 auto",
		display: "block",
		textAlign: "center"
	},
	scroll: {
		// overflow: "hidden",
		// whiteSpace: "nowrap"
	},
	bubble: {
		height: "100px",
		width: "100px",
		backgroundColor: "red"
	}
}));

export default useStyles;
