import React, { useState } from "react";

const StarRating = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (newRating) => {
    setRating(newRating);
    onRate(newRating);
  };

  return (
    <div className="starRating">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index + 1)}
          style={{ cursor: "pointer" }}
        >
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
