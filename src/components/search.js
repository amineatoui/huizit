import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { SearchOutlined } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import { getMoviesOfActor, searchForMovie } from "../services/filmService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Paper, Stack, styled } from "@mui/material";

import SearchItem from "./searchItem";
import MoviesOfActor from "./moviesOfActor";
import { auth } from "../firebase";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Search = () => {
  const [open, setOpen] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchMovieResults, setSearchMovieResults] = useState(null);
  const [searchActorResult, setsearchActorResult] = useState(null);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/", { replace: true });
  };

  const handleSearchChange = async (e) => {
    setSearchInput(e.target.value);
    setSearchMovieResults(null);
    if (e.target.value.length > 2) {
      await searchForMovie(e.target.value)
        .then((res) => {
          setSearchMovieResults(res);
        })
        .catch((err) => {
          if (err === "no result") {
            setSearchMovieResults(null);
          }
        });

      await getMoviesOfActor(e.target.value)
        .then((res) => {
          setsearchActorResult(res);
        })
        .catch((err) => {
          if (err === "no result") {
            setsearchActorResult(null);
          }
        });
    }
  };
  useEffect(() => {
    if (auth.currentUser === null) {
      navigate("/login", {
        replace: true,
        state: {
          didLogin: false,
        },
      });
    }
  }, []);
  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>rechercher un acteur ou un film</DialogTitle>

        <DialogContent>
          <TextField
            autoComplete="off"
            onChange={(e) => handleSearchChange(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
            autoFocus
            margin="dense"
            id="name"
            label="rechercher"
            type="text"
            fullWidth
            variant="standard"
          />
          {searchInput.length <= 2 && (
            <Alert severity="error">
              veuillez entrer {3 - searchInput.length} caractéres de plus !
            </Alert>
          )}
          {searchMovieResults && (
            <SearchItem isMovie={true} movie={searchMovieResults}></SearchItem>
          )}

          {!searchMovieResults && !searchActorResult && searchInput.length > 2 && (
            <div>
              <Alert severity="error">aucun résultat trouvé</Alert>
            </div>
          )}
          {searchActorResult && (
            <MoviesOfActor
              didSearched={true}
              movies={searchActorResult}
            ></MoviesOfActor>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>annuler</Button>
          <Button>done</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </div>
  );
};

export default Search;
