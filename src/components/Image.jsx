import React from "react";

const Image = ({ url = "", alt = "", style = {} }) => {
  return (
    <img
      style={{ borderRadius: 50, width: 100, height: 100, ...style }}
      src={url}
      alt={alt}
    />
  );
};

export default Image;
