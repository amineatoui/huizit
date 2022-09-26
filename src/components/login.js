import React, { Component, useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import EmailIcon from "@material-ui/icons/Email";
import Https from "@material-ui/icons/Https";
import Button from "@material-ui/core/Button";
import { logInWithEmailAndPassword } from "../services/authService";
import { auth } from "../firebase";
const Login = (props) => {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState();
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [password, setPassword] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.state !== null &&
      !location.state.didLogin &&
      auth.currentUser === null
    ) {
      toast("veuillez connecter d'abors s'il vous plait !");
    } else if (auth.currentUser !== null) {
      auth.signOut().then(() => toast("déconnexion !"));
    } else {
    }
  }, []);
  const handleClose = () => {
    navigate("/", { replace: true });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    await logInWithEmailAndPassword(email, password)
      .then(() => {
        setTimeout(() => {
          navigate("/", { replace: true });
          return;
        }, 500);
        setSuccessMessage("connexion établit avec succé");
      })
      .catch((err) => {
        console.log(err);
        if (err.includes("user-not-found")) {
          setErrMessage("ce mail n'existe pas");
        } else if (err.includes("wrong-password")) {
          setErrMessage("mot de passe incorrect");
        } else {
          setErrMessage("veuillez réessayer plus tard");
        }
      });
  };
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Se Connecter</DialogTitle>
        <DialogContent>
          <DialogContentText>
            veuillez saisir votre email et votre mot de passe
          </DialogContentText>
          {errMessage.length > 0 && successMessage.length == 0 && (
            <DialogContentText color="error">{errMessage}</DialogContentText>
          )}

          {successMessage.length > 0 && (
            <DialogContentText color="primary">
              {successMessage}
            </DialogContentText>
          )}
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            autoFocus
            margin="dense"
            id="email"
            label="Adresse Email"
            type="email"
            fullWidth
            variant="standard"
            onInput={(e) => handleEmail(e)}
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Https />
                </InputAdornment>
              ),
            }}
            onInput={(e) => handlePassword(e)}
            autoFocus
            margin="dense"
            id="pwd"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
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
    </>
  );
};

export default Login;
