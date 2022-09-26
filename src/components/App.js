import React, { Component } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AddVideo from "./addVideo";
import Home from "./home";
import Login from "./login";
import Navbar from "./navbar";
import Search from "./search";
import UpdateActor from "./updateActor";
class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" exact element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/add" element={<AddVideo></AddVideo>}></Route>
            <Route path="/search" element={<Search></Search>}></Route>
            <Route
              path="/updateActor"
              element={<UpdateActor></UpdateActor>}
            ></Route>
          </Routes>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
