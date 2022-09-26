import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import MovieCard from "./movie";
const SearchItem = (props) => {
  const [open, setopen] = useState(true);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setopen(false)}>
      <DialogTitle>
        <Grid container spacing={3}>
          <Grid item xs={11}>
            <Alert sevrity="success">résultat trouvé</Alert>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => setopen(false)}>
              <Close></Close>
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <MovieCard movie={props.movie}></MovieCard>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchItem;
