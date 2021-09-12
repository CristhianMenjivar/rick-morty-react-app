import React from "react";
import styles from "./card.module.css";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";

export default function Card({
  isHide = false,
  showButtonDelete = false,
  name,
  image,
  rightClick,
  leftClick,
  onClickButtonDelete,
}) {
  const handlerLeftClick = () => {
    leftClick && leftClick();
  };

  const handlerBottomClick = () => {
    onClickButtonDelete && onClickButtonDelete();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img alt="rick" src={image} />
        <p className={styles.name}>{name}</p>

        {!isHide && (
          <div className={styles.actions}>
            <div onClick={handlerLeftClick} className={styles.left}>
              <FontAwesome name="thumbs-down" size="2x" />
            </div>
            <div onClick={rightClick} className={styles.right}>
              <FontAwesome name="heart" size="2x" />
            </div>
          </div>
        )}

        {showButtonDelete && (
          <button onClick={handlerBottomClick} className={styles.deleteButton}>
            Delete from favorite
          </button>
        )}
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  leftClick: PropTypes.func,
  rightClick: PropTypes.func,
};

Card.defaultProps = {
  name: "",
  image: "",
};
