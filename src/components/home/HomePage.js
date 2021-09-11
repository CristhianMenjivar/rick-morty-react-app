import React from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import useCharacters from "../../hooks/useCharacters";

const Home = () => {
  const {
    isFetching,
    errors,
    current,
    nextChar,
    addToFavorite,
  } = useCharacters();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personajes de Rick y Morty</h1>

      {errors && <h2>Error al cargar: {errors}</h2>}

      {isFetching ? (
        <h2>Cargando</h2>
      ) : (
        <>
          {current?.id && (
            <Card
              leftClick={nextChar}
              rightClick={() => addToFavorite(current)}
              {...current}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
