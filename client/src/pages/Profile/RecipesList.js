import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Moment from "react-moment";

import imgurUrlModifier from "utils/imgurUrlModifier";
import { actions as recipeActions } from "reducers/recipes";
import useStyles from "./styles";

const RecipesList = ({ recipes, showAddMore }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteRecipe = (id) => {
    dispatch(recipeActions.deleteRecipeRequest(id));
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="stretch"
      >
        {recipes.map(({ _id, image, name, duration, date }, i) => (
          <Grid item key={i} xl={2} lg={3} md={4} sm={6} xs={12}>
            <Card>
              <CardActionArea
                component={Link}
                to={`/profile/view-recipe/${_id}`}
              >
                <CardMedia
                  className={classes.cardMedia}
                  image={imgurUrlModifier(image.link, "m")}
                  title={name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    <Moment format="YYYY/MM/DD">{date}</Moment>
                  </Typography>
                  <Grid container spacing={0} alignItems="center">
                    <AccessTimeIcon fontSize="small" />
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      align="left"
                    >
                      {duration} min
                    </Typography>
                  </Grid>{" "}
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  component={Link}
                  to={`/profile/edit-recipe/${_id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.colorDanger}
                  onClick={() => deleteRecipe(_id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {showAddMore && (
          <Grid
            item
            key={-1}
            xl={2}
            lg={3}
            md={4}
            sm={6}
            xs={12}
            component={Link}
            to="/profile/add-recipe"
          >
            <Box
              border={2}
              borderColor="grey.900"
              component={ButtonBase}
              className={classes.addMoreCard}
            >
              <AddCircleOutlineIcon style={{ fontSize: 80 }} />
            </Box>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

RecipesList.defaultProps = {
  showAddMore: false,
};

RecipesList.propTypes = {
  recipes: PropTypes.array.isRequired,
  showAddMore: PropTypes.bool,
};

export default React.memo(RecipesList);
