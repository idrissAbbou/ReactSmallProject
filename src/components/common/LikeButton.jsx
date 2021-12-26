import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FaHeart } from "react-icons/fa";

class LikeButton extends React.Component {
  render() {
    const { movie, onToggle } = this.props;
    return (
      <div>
        <FaHeart
          onClick={() => onToggle(movie._id)}
          className={movie.liked === true ? "text-danger" : "text-secondary"}
          style={{ cursor: "pointer" }}
        />
      </div>
    );
  }
}

export default LikeButton;
