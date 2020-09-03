import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import useStyles from "./styles.js";

const ImageButton = forwardRef(
  ({ id, name, children, defaultImage }, forwardedRef) => {
    const [image, setImage] = useState(defaultImage);
    const classes = useStyles();

    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        setImage(URL.createObjectURL(event.target.files[0]));
      }
    };

    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <div
          style={{ backgroundImage: `url("${image}")` }}
          className={classes.image}
        />
        <label htmlFor={id}>
          <input
            id={id}
            onChange={onImageChange}
            style={{ display: "none" }}
            ref={forwardedRef}
            type="file"
            name={name}
          />
          <Button color="primary" variant="contained" component="span">
            {children ? children : "Choose Image"}
          </Button>
        </label>
      </Grid>
    );
  }
);

ImageButton.defaultProps = {
  defaultImage:
    "https://images.unsplash.com/photo-1487260211189-670c54da558d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
};

ImageButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ImageButton;
