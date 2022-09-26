import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const UpdateActor = (props) => {
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState(null);
  console.log(open);
  const handleUpload = async () => {
    let body = new FormData();

    body.append("image", image);
    body.append("name", props.name);
    let res = await fetch("http://localhost:9000/storeActors", {
      method: "post",
      body: body,
    }).catch(() => {
      toast("veuillez essayer plus tard");
    });
    if (res.status === 200) {
      toast("image ajouté avec succée");
    } else {
      toast("problème interne du serveur");
    }
  };

  return (
    <>
      <Dialog
        key={props.name}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{
            color: "blueviolet",
          }}
          id="alert-dialog-title"
        >
          Ajouter une autre photo pour {props.name}
        </DialogTitle>
        <DialogContent>
          <Box mt={2} mb={2}>
            <label
              htmlFor="uploaded-photo"
              style={{ cursor: "pointer", fontFamily: "sans-serif" }}
            >
              {" "}
              sélectionner une photo . . .
            </label>
            <input
              required={true}
              id="uploaded-photo"
              style={{
                opacity: 0,
                position: "absolute",
                zIndex: "-1",
              }}
              type="file"
              onChange={(e) => {
                e.preventDefault();
                setImage(e.target.files[0]);
              }}
              accept="upload/image"
            ></input>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleUpload()}
            disabled={image === null}
            color="primary"
          >
            Ajouter
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setOpen(false);
            }}
            autoFocus
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer
        position="top-center"
        autoClose={2000}
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

export default UpdateActor;
