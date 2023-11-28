import React from "react";
import StarRating from "react-native-star-rating-widget";

const Star_rating = (props) => {
  const {
    value,
    onChange,
    size,
    numberOfStar,
    color,
    emptyColor,
    enableHalfStar,
    enableSwiping,
    style,
  } = props;
  return (
    <StarRating
      rating={value}
      onChange={onChange}
      maxStars={numberOfStar}
      starSize={size}
      color={color}
      emptyColor={emptyColor}
      style={style}
      enableHalfStar={enableHalfStar ? enableHalfStar : false}
      enableSwiping={enableSwiping ? enableSwiping : true}
    />
  );
};
export default Star_rating;
