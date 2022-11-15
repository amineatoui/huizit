import React, { Component, useEffect, useState } from "react";
import MovieCard from "./movie";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import {
  deleteProposal,
  getAllMovies,
  getAllProposals,
  indexed,
} from "../services/filmService";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import CountUp from "react-countup";
import { Pagination } from "@mui/material";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Proposal from "./proposal";
const Home = () => {
  const [listOfMovies, setListOfMovies] = useState([]);
  const [showMovies, setshowMovies] = useState(false);
  const [pagenum, setPagenum] = useState(1);
  const [totalMovies, settotalMovies] = useState(0);
  const [totalActors, settotalActors] = useState(0);
  const [showProposals, setshowProposals] = useState(false);
  const [listOfProposals, setlistOfProposals] = useState([]);
  const [totalPRposal, setTotalPRposal] = useState(0);
  const [propasalPageNum, setpropasalPageNum] = useState(1);
  const navigate = useNavigate();
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

  useEffect(() => {}, []);
  const fetchMovies = async (page) => {
    await getAllMovies()
      .then((data) => {
        settotalMovies(data.length);
        const subarray = data.slice((page - 1) * 3, page * 3);
        setListOfMovies(subarray);
      })
      .catch((err) => {
        if (err.toString().includes("Failed to get documents from server", 0)) {
          toast("Problème de connexion à la base de donnée");
        } else {
          toast("veuillez ressayer plus tard");
        }
      });
  };
  const getTotalActors = async () => {
    await fetch("http://localhost:9000/statistics", {
      method: "get",
    }).then((resp) => {
      resp.json().then((data) => settotalActors(data.totalActors));
    });
  };

  const fetchProposals = async (page) => {
    await getAllProposals()
      .then((data) => {
        setTotalPRposal(data.length);
        const subarray = data.slice((page - 1) * 3, page * 3);
        console.log(subarray);
        setlistOfProposals(subarray);
      })
      .catch((err) => {
        if (err.toString().includes("Failed to get documents from server", 0)) {
          toast("Problème de connexion à la base de donnée");
        } else {
          toast("veuillez ressayer plus tard");
        }
      });
  };
  useEffect(() => {
    getTotalActors();
  }, []);

  useEffect(() => {
    fetchMovies(pagenum);
  }, [pagenum]);

  useEffect(() => {
    fetchProposals(propasalPageNum);
  }, [propasalPageNum]);

  const fetchD = () => {
    fetch("http://localhost:8080/greetings", {
      method: "get",

      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8080/greetings",

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    fetchD();
    return () => {};
  }, []);

  return (
    <div>
      <Grid
        key={1}
        container
        spacing={8}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 5,
        }}
      >
        <Grid
          key={2}
          item
          style={{
            width: "300px",
          }}
        >
          <Alert variant="filled" severity="info">
            <AlertTitle style={{ fontWeight: "bold" }}>
              Total Propositions
            </AlertTitle>
            <CountUp start={0} end={totalPRposal} duration={3}></CountUp>
          </Alert>
        </Grid>
        <Grid
          key={3}
          item
          style={{
            width: "300px",
          }}
        >
          <Alert variant="filled" severity="info">
            <AlertTitle style={{ fontWeight: "bold" }}>Total films</AlertTitle>
            <CountUp start={0} end={totalMovies} duration={3}></CountUp>
          </Alert>
        </Grid>
        <Grid
          item
          style={{
            width: "300px",
          }}
        >
          <Alert variant="filled" severity="info">
            <AlertTitle style={{ fontWeight: "bold" }}>
              Total acteurs
            </AlertTitle>
            <CountUp start={0} end={totalActors} duration={5}></CountUp>
          </Alert>
        </Grid>
      </Grid>
      {listOfMovies.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <Card
            style={{
              width: "auto",
              height: "auto",
              overflowY: "visible",
            }}
          >
            <CardHeader
              title="Liste de films"
              action={
                <IconButton onClick={() => setshowMovies((prev) => !prev)}>
                  <ArrowDropDown></ArrowDropDown>
                </IconButton>
              }
            ></CardHeader>
            <CardContent
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {showMovies && (
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
                  {listOfMovies.map((movie) => {
                    return (
                      <Grid item key={movie.id}>
                        <MovieCard movie={movie}></MovieCard>
                      </Grid>
                    );
                  })}
                </Grid>
              )}

              {totalMovies >= 3 && showMovies && (
                <div style={{ marginTop: 5 }}>
                  <Pagination
                    color="primary"
                    shape="circular"
                    variant="outlined"
                    count={Math.floor(totalMovies / 3) + 1}
                    onChange={(e, page) => setPagenum(page)}
                  ></Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div>
        <Card
          style={{
            width: "auto",
            height: "auto",
            overflowY: "visible",
            marginTop: 30,
          }}
        >
          <CardHeader
            title="Liste de proposition"
            action={
              <IconButton onClick={() => setshowProposals((prev) => !prev)}>
                <ArrowDropDown></ArrowDropDown>
              </IconButton>
            }
          ></CardHeader>
          {showProposals && (
            <CardContent
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Grid
                container
                style={{
                  marginTop: "1rem",
                }}
                wrap="wrap"
                direction="row"
                justifyContent="space-evenly"
                spacing={10}
              >
                {listOfProposals.map((proposal) => {
                  return (
                    <Grid item>
                      <Proposal
                        onDelete={(id) => {
                          deleteProposal(id);
                          setpropasalPageNum(1);
                        }}
                        proposal={proposal}
                      ></Proposal>
                    </Grid>
                  );
                })}
              </Grid>
              {totalPRposal >= 3 && showProposals && (
                <div style={{ marginTop: 5 }}>
                  <Pagination
                    color="primary"
                    shape="circular"
                    variant="outlined"
                    count={Math.floor(totalPRposal / 3) + 1}
                    onChange={(e, page) => setpropasalPageNum(page)}
                  ></Pagination>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      </div>
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

export default Home;
