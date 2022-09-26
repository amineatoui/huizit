import { IconButton, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Delete } from "@material-ui/icons";

const AddedActor = (props) => {
  return (
    <div>
      <ListItem>
        <ListItemText primary={props.actor.name} />
        <IconButton onClick={() => props.onDelete(props.actor)}>
          <Delete></Delete>
        </IconButton>
      </ListItem>
    </div>
  );
};

export default AddedActor;
