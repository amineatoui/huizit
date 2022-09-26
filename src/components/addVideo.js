import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import "../css/add.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddedActor from "./addedActor";
import { AddCircle } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { addMovie, verifTitle } from "../services/filmService";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
const AddVideo = () => {
  const [file, setFile] = useState(null);
  const [actors, setActors] = useState([]);
  const [title, setTitle] = useState("");
  const [actorName, setActorName] = useState("");
  const [actorImage, setActorImage] = useState(null);
  const [origins, setOrigins] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [period, setPeriod] = useState(0);
  const [language, setLanguage] = useState("");
  const initialCategoriesState = [
    { id: 1, category: "drama" },
    { id: 2, category: "action" },
    { id: 3, category: "sience fiction" },
  ];
  const [categories, setCategories] = useState(initialCategoriesState);
  const [realisation, setRealisation] = useState("");
  const [scenarist, setScenarist] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setcover] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState("");

  const handleUploadCover = (e) => {
    e.preventDefault();
    setcover(e.target.files[0]);
  };
  const handleActors = () => {
    if (actorName.length === 0 || actorImage.length === 0) {
      return;
    }
    const joined = actors.concat({
      name: actorName,
      image: actorImage,
    });
    setActors(joined);
  };
  const handleUploadVideo = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  const handleUploadActorImage = (e) => {
    e.preventDefault();
    setActorImage(e.target.files[0]);
  };
  const handleTitle = async (title) => {
    await verifTitle(title)
      .then(() => {
        setTitle(title);
      })
      .catch((err) => {
        if (err === "movie exist") {
          toast("ce film exist déja !");
        }
      });
  };
  const navigate = useNavigate();

  const handleDeleteActor = (actor) => {
    const index = actors.findIndex((el) => el.name === actor.name);
    let actorsCopy = [...actors];
    actorsCopy.splice(index);
    setActors(actorsCopy);
    console.log(actors);
  };

  /*
  //state for handling file uploading %
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  //func that uploads a file to firebase
  const uploadVideo = (file) => {
    const storageRef = ref(storage, `/videos/2`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setLoading(true);
        setPercentage(percent);
      },
      (err) => {
        setLoading(false);
        console.log(err);
      },
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setLoading(false);
        });
      }
    );
  };

            <Box mt={2} sx={{ width: "180%" }}>
              {isLoading && (
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 2, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <label style={{ fontFamily: "sans-serif", color: "blue" }}>
                      mise en ligne de la vidéo en cours . . . .
                    </label>
                  </Grid>
                  <Grid item xs={6}>
                    <CircularProgressWithLabel
                      progress={percentage}
                    ></CircularProgressWithLabel>
                  </Grid>
                </Grid>
              )}
            </Box>

  */
  const addMovieHandler = async (e) => {
    e.preventDefault();
    if (verifyEmptyInputs()) {
      toast("tous les champs sont obligatoires !");
      return;
    }
    let movie = {
      title: title,
      actors: [],
      origins: origins,
      language: language,
      realisation: realisation,
      releaseDate: releaseDate,
      description: description,
      period: period,
      scenarist: scenarist,
      selectedCategories: [],
      id: "",
    };

    actors.forEach((actor) => {
      movie.actors.push(actor.name);
    });
    selectedCategories.forEach((el) => {
      movie.selectedCategories.push(el.category);
    });

    const id = await uploadVideo(file);
    if (id) {
      movie.id = id;
      uploadCover(cover, id);
      actors.forEach((actor) => {
        uploadImage(actor.image, actor.name);
      });
    } else {
      toast("problème lors du téléchargement de la video");
    }
    addMovie(movie)
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 3000);
        toast("film ajouté avec succé");
      })
      .catch((err) => {
        toast("veuillez ressayer plus tard");
      });
  };

  const verifyEmptyInputs = () => {
    return (
      title.length === 0 ||
      file === null ||
      cover === null ||
      actors.length === 0 ||
      origins.length === 0 ||
      releaseDate.length === 0 ||
      realisation.length === 0 ||
      description.length === 0 ||
      period.length === 0 ||
      selectedCategories.length === 0 ||
      scenarist.length === 0
    );
  };

  const uploadVideo = async (video) => {
    let body = new FormData();
    body.append("file", video);
    const res = await fetch("http://localhost:9000/storeVideo", {
      method: "post",
      body: body,
    });
    const resp = await res.json();
    return resp.id;
  };

  const uploadImage = async (image, name) => {
    let body = new FormData();
    body.append("image", image);
    body.append("name", name);
    let res = await fetch("http://localhost:9000/storeActors", {
      method: "post",
      body: body,
    });
    if (res.status === 406) {
      toast(`l'image de ${name} exist déja !`);
    }
  };

  const uploadCover = async (image, id) => {
    let body = new FormData();
    body.append("image", image);
    body.append("id", id);
    let res = await fetch("http://localhost:9000/storeCover", {
      method: "post",
      body: body,
    });
  };
  const handleCategories = (event, value, situation) => {
    if (situation === "remove-option") {
      selectedCategories.forEach((el) => {
        let index = value.findIndex((v) => v.category === el.category);

        if (index === -1) {
          let catCopy = [...categories];
          catCopy.push(el);
          setCategories(catCopy);

          let indexInSelected = selectedCategories.findIndex(
            (c) => c.category === el.category
          );
          let selectedCategoriesCopy = [...selectedCategories];
          selectedCategoriesCopy.splice(indexInSelected, 1);
          setSelectedCategories(selectedCategoriesCopy);
        }
      });
    }
    if (situation === "clear") {
      setCategories(initialCategoriesState);
      setSelectedCategories([""]);
    }
    if (situation === "select-option") {
      const index = categories.findIndex(
        (el) => el.category === value[value.length - 1].category
      );
      let categoriesCopy = [...categories];
      let selectedCategoriesCopy = [...selectedCategories];
      selectedCategoriesCopy.push(value[value.length - 1]);
      setSelectedCategories(selectedCategoriesCopy);
      categoriesCopy.splice(index, 1);
      setCategories(categoriesCopy);
    }
  };
  useEffect(() => console.log(auth.currentUser), []);

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
    <div id="container">
      <Card id="formCard">
        <CardContent style={{ width: "100%" }}>
          <Typography gutterBottom variant="h5" component="div">
            Formulaire d'ajout
          </Typography>
          <Box>
            <TextField
              error={title.length === 0}
              required={true}
              onInput={(e) => handleTitle(e.target.value)}
              fullWidth={true}
              label="titre"
            />
          </Box>
          <Divider></Divider>
          <Box mt={2} mb={2}>
            <label
              htmlFor="uploaded-video"
              style={{ cursor: "pointer", fontFamily: "sans-serif" }}
            >
              {" "}
              sélectionner une video . . .
            </label>
            <input
              required={true}
              id="uploaded-video"
              style={{
                opacity: 0,
                position: "absolute",
                zIndex: "-1",
              }}
              type="file"
              onChange={(e) => handleUploadVideo(e)}
              accept="upload/video"
            ></input>
          </Box>
          <Box mt={2} mb={2}>
            <label
              htmlFor="uploaded-cover"
              style={{ cursor: "pointer", fontFamily: "sans-serif" }}
            >
              {" "}
              sélectionner une couverture . . .
            </label>
            <input
              required={true}
              id="uploaded-cover"
              style={{
                opacity: 0,
                position: "absolute",
                zIndex: "-1",
              }}
              type="file"
              onChange={(e) => handleUploadCover(e)}
              accept="upload/image"
            ></input>
          </Box>
          <Divider orientation="horizontal"></Divider>
          <Box mt={2}>
            <Grid container>
              <Grid item xs={5}>
                <TextField
                  required={true}
                  error={actors.length === 0}
                  onInput={(e) => setActorName(e.target.value)}
                  label="nom d'acteur"
                ></TextField>
              </Grid>
              <Grid style={{ marginTop: "2.2rem" }} item xs={5}>
                <label
                  htmlFor="uploaded-photo"
                  style={{ cursor: "pointer", fontFamily: "sans-serif" }}
                >
                  {" "}
                  sélectionner son photo . . .
                </label>
                <input
                  required={true}
                  onChange={(e) => handleUploadActorImage(e)}
                  id="uploaded-photo"
                  style={{
                    opacity: 0,
                    position: "absolute",
                    zIndex: "-1",
                  }}
                  type="file"
                  accept="upload/image"
                ></input>
              </Grid>
              <Grid item style={{ marginTop: "1rem" }} xs={2}>
                <IconButton onClick={handleActors}>
                  <AddCircle></AddCircle>
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>List d'acteurs</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Box width="100%">
                  {actors.map((actor) => {
                    return (
                      <AddedActor
                        onDelete={() => handleDeleteActor(actor)}
                        actor={actor}
                      ></AddedActor>
                    );
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Divider></Divider>
          <Box mt={1}>
            <TextField
              required={true}
              error={origins.length === 0}
              onChange={(e) => setOrigins(e.target.value)}
              fullWidth
              label="pays d'origine"
            ></TextField>
          </Box>
          <Divider></Divider>
          <Box mt={1}>
            <Grid container>
              <Grid style={{ marginTop: "1rem" }} item xs={4}>
                <TextField
                  required={true}
                  error={releaseDate.length === 0}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  type="date"
                ></TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  error={language.length === 0}
                  required={true}
                  onChange={(e) => setLanguage(e.target.value)}
                  label="langue"
                ></TextField>
              </Grid>
              <Grid style={{ marginLeft: "1rem" }} item xs={4}>
                <TextField
                  required={true}
                  error={period.length === 0}
                  onChange={(e) => setPeriod(e.target.value)}
                  type="number"
                  label="durée"
                ></TextField>
              </Grid>
            </Grid>
          </Box>
          <Divider></Divider>
          <Box mt={2}>
            <Autocomplete
              required={true}
              onChange={(event, value, s) => handleCategories(event, value, s)}
              multiple
              id="tags-standard"
              options={categories}
              getOptionLabel={(option) => option.category}
              renderInput={(params) => (
                <TextField
                  error={selectedCategories.length === 0}
                  {...params}
                  label="genres"
                  placeholder="genres"
                />
              )}
            />
          </Box>
          <Divider></Divider>
          <Box mt={1}>
            <TextField
              required={true}
              error={realisation.length === 0}
              onChange={(e) => setRealisation(e.target.value)}
              fullWidth
              label="réalisation"
            ></TextField>
          </Box>
          <Box mt={1}>
            <TextField
              required={true}
              error={scenarist.length === 0}
              onChange={(e) => setScenarist(e.target.value)}
              fullWidth
              label="scénario"
            ></TextField>
          </Box>
          <Box mt={1}>
            <TextField
              error={description.length === 0}
              required={true}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              label="description"
            ></TextField>
          </Box>
          <Button
            type="submit"
            style={{ marginTop: "1rem" }}
            onClick={(e) => addMovieHandler(e)}
            variant="contained"
          >
            ajouter
          </Button>
        </CardContent>
      </Card>
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
    </div>
  );
};

export default AddVideo;
