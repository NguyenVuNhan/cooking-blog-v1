import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	image: {
		width: "100%",
		height: 0,
		paddingTop: "100%",
		backgroundSize: "cover",
		backgroundPosition: "center",
		marginBottom: theme.spacing(2)
	}
}));

export default useStyles;
