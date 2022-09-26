import React, { useState } from "react";
import { ArrowDropDown } from "@material-ui/icons";
import { DeleteOutline } from "@material-ui/icons";
import { styled } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Paper, Stack, Tooltip, Grid } from "@mui/material";
import { CardMedia } from "@material-ui/core";
import MoviesOfActor from "./moviesOfActor";
import UpdateActor from "./updateActor";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function MovieCard(props) {
  const [showActors, setshowActors] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openActorDialog, setOpenActorDialog] = useState();
  const [clickedActor, setclickedActor] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      style={{ width: 250, backgroundColor: "#757de8", marginBottom: 10 }}
      sx={{ maxWidth: 300, overflow: "auto" }}
    >
      <CardHeader
        action={
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            aria-label="settings"
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={props.movie.title}
        subheader={props.movie.releaseDate}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <DeleteOutline style={{ marginRight: "1rem" }}></DeleteOutline>
          Supprimer
        </MenuItem>
      </Menu>
      <CardMedia
        style={{ marginRight: 5, marginLeft: 5, width: "95%" }}
        component="img"
        height="160"
        image={`http://192.168.1.9:9000/getCover/${props.movie.id}`}
        alt="green iguana"
      />
      <CardContent>
        <Box style={{ marginRight: "1rem", marginTop: 1 }}>
          <Typography sx={{ fontSize: 12 }} component="div" gutterBottom>
            <strong>Genres : </strong>
            {props.movie.selectedCategories.map((el) => {
              return (
                <p style={{ display: "inline" }} key={el}>
                  {el + " "}
                </p>
              );
            })}
          </Typography>
        </Box>
        <Box style={{ marginRight: "1rem", marginTop: 1 }}>
          <Typography sx={{ fontSize: 12 }} component="div" gutterBottom>
            <strong>Origine :</strong> {props.movie.origins}
          </Typography>
        </Box>
        <Box style={{ marginRight: "1rem", marginTop: 1 }}>
          <Typography sx={{ fontSize: 12 }} component="div" gutterBottom>
            <strong>Scénarist :</strong> {props.movie.scenarist}
          </Typography>
        </Box>
        <Box style={{ marginRight: "1rem", marginTop: 1 }}>
          <Typography sx={{ fontSize: 12 }} component="div" gutterBottom>
            <strong>Réalisation :</strong> {props.movie.realisation}
          </Typography>
        </Box>
        <Typography variant="body2">{props.movie.description}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box style={{ width: "100%" }}>
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            alignContent="center"
          >
            <Grid item>
              <Typography
                paragraph
                style={{ marginTop: "0.8rem", margingRight: "0.5rem" }}
              >
                liste d'acteurs
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setshowActors((prev) => !prev)}>
                <ArrowDropDown></ArrowDropDown>
              </IconButton>
            </Grid>
          </Grid>
          {showActors && (
            <Stack spacing={1}>
              {props.movie.actors.map((el) => {
                return (
                  <Item
                    key={el}
                    style={{ width: "90%" }}
                    onClick={() => {
                      setclickedActor(el);
                      setOpenActorDialog(true);
                    }}
                  >
                    {el}
                  </Item>
                );
              })}
            </Stack>
          )}
          {openActorDialog === true && (
            <UpdateActor name={clickedActor}></UpdateActor>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
