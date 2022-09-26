import React from "react";
import Card from "@material-ui/core/Card";
import CradHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

const ActorCard = () => {
  return (
    <Card>
      <CradHeader title="actor name"></CradHeader>
      <CardMedia
        style={{
          height: "80%",
          width: "90%",
          margin: "0.5rem 0.5rem 0.5rem 0.5rem",
        }}
        component="img"
        image={require("../acteur.jpeg")}
      ></CardMedia>
    </Card>
  );
};

export default ActorCard;
