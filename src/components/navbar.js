import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Add, Search, ExitToApp } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const Navbar = () => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const sub = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return sub;
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Huizit
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/add"
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<Add></Add>}
                  >
                    Ajouter un film
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Link
                to="/search"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<Search />}
                >
                  rechercher . . .
                </Button>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<ExitToApp></ExitToApp>}
                  >
                    {user !== null ? "se déconnecter" : "se connecter"}
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
