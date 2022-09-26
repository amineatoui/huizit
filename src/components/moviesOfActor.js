import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import MovieCard from "./movie";

const MoviesOfActor = (props) => {
  const [open, setopen] = useState(true);
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setopen(false)}>
      <DialogTitle>
        <Grid container spacing={3}>
          {props.didSearched && (
            <Grid item xs={11}>
              <Alert sevrity="success">
                {props.movies.length} résultat(s) trouvé
              </Alert>
            </Grid>
          )}

          <Grid item xs={1}>
            <IconButton onClick={() => setopen(false)}>
              <Close></Close>
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid
          style={{
            marginTop: "1rem",
          }}
          container
          wrap="wrap"
          direction="row"
          justifyContent="space-evenly"
          spacing={10}
        >
          {props.movies.map((movie) => {
            return (
              <div key={movie.id}>
                <MovieCard movie={movie}></MovieCard>
              </div>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoviesOfActor;
