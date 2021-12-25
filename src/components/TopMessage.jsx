import React from "react";

function RenderTopMessage(props) {
  return props.itemsCount === 0 ? (
    <h4>there is no movies to show</h4>
  ) : (
    <h4>showing {props.itemsCount} movies</h4>
  );
}

export default RenderTopMessage;
