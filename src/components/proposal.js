import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Icon,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Delete, Add } from "@material-ui/icons";
const Proposal = (props) => {
  const handleDelete = async () => {
    const body = new FormData();
    body.append("username", props.proposal.username);
    body.append("actor", props.proposal.actor);
    const res = await fetch(`http://192.168.1.102:9000/deleteProposed`, {
      method: "post",
      body: body,
    });
    if (res.status === 200) {
      props.onDelete(props.proposal.id);
    }
  };
  return (
    <Card
      key={props.proposal.id}
      style={{ width: 250, backgroundColor: "#002884", marginBottom: 10 }}
      sx={{ maxWidth: 300, overflow: "auto" }}
    >
      <CardMedia
        style={{ margin: 5, width: "95%" }}
        component="img"
        height="160"
        image={`http://192.168.1.102:9000/getProposed/${props.proposal.username}/${props.proposal.actor}`}
        alt="green iguana"
      />
      <CardContent>
        <Box style={{ marginRight: "1rem", marginTop: 1 }}>
          <Typography sx={{ fontSize: 12 }} component="div" gutterBottom>
            <strong>Propsition : </strong>
            {props.proposal.actor}
          </Typography>
        </Box>
        <Box style={{ marginRight: "1rem", marginTop: 1 }}>
          <Typography sx={{ fontSize: 12 }} component="div" gutterBottom>
            <strong>Propsé Par : </strong>
            {props.proposal.username}
          </Typography>
        </Box>
        <Box style={{ marginRight: "1rem", marginTop: 1 }}>
          <Typography sx={{ fontSize: 12 }} component="div" gutterBottom>
            <strong>Liste de Films : </strong>
            {props.proposal.movies.map((el) => {
              return (
                <p style={{ display: "inline" }} key={el}>
                  {el + " "}
                </p>
              );
            })}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Grid container alignItems="center" justifyContent="space-around">
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Delete></Delete>}
            >
              Supprimer
            </Button>
          </Grid>
          <Grid item style={{ marginTop: 5 }}>
            <Button
              variant="outlined"
              style={{ color: "greenyellow" }}
              startIcon={<Add></Add>}
            >
              Accepter
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Proposal;
