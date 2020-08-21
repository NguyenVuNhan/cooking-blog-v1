import { makeStyles } from "@material-ui/core/styles";
import sharedStyles from "sharedStyles";

const useStyles = makeStyles(theme => ({
	...sharedStyles(theme),
	grow: {
		flexGrow: 1
	},
	cardHeight: {
		minHeight: 200
	},
	cardMedia: {
		height: 0,
		paddingTop: "75%" // 4:3
	},
	addMoreCard: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		minHeight: 200,
		height: "100%",
		width: "100%"
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: "50%",
		[theme.breakpoints.down("sm")]: {
			width: "auto"
		}
	}
}));

export default useStyles;
