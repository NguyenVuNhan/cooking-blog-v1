const sharedStyles = theme => ({
	xsJustifyCenter: {
		[theme.breakpoints.down("xs")]: {
			justifyContent: "center"
		}
	},
	grow: {
		flexGrow: 1
	},
	h100: {
		height: "100%"
	},
	w100: {
		width: "100%"
	},
	borderDashed: {
		borderStyle: "dashed"
	},
	border: {
		border: 2,
		borderStyle: "solid"
	},
	my2: {
		marginTop: theme.spacing(2)
	}
});

export default sharedStyles;
