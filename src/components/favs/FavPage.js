import React from "react";
import styles from "./favs.module.css";
import Card from "../card/Card";
import useCharacters from "../../hooks/useCharacters";

export default function FavPage() {
  const { favoriteChars = [], isFetchingFavorites } = useCharacters();

  const renderCharacter = (char) => {
    return <Card isHide {...char} key={char.id} />;
  };
  return (
    <>
      <h1 className={styles.title}>Favoritos</h1>
      <div className={styles.container}>
        {isFetchingFavorites ? (
          <h2>Cargando Favoritos...</h2>
        ) : (
          <>
            {favoriteChars.map(renderCharacter)}
            {!favoriteChars.length && <h3>No hay personajes agregados</h3>}
          </>
        )}
      </div>
    </>
  );
}
