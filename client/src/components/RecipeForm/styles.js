import { makeStyles } from "@material-ui/core/styles";
import sharedStyles from "../../sharedStyles";

const useStyles = makeStyles((theme) => ({
  ...sharedStyles(theme),
  paper: {
    marginTop: 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
}));

export default useStyles;
