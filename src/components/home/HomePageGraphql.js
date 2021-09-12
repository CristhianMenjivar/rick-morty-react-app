import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import styles from "./home.module.css";

// graphql
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";

const HomePageGraphql = () => {
  const [chars, setChars] = useState([]);

  const query = gql`
    {
      characters {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          image
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(query);

  useEffect(() => {
    if (data && !loading && !error) {
      setChars(data.characters.results);
    }
  }, [data, loading, error]);

  const nextChar = () => {
    chars.shift();
    setChars([...chars]);
  };
  const addToFavorite = () => {};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personajes de Rick y Morty</h1>

      {error && <h2>Error al cargar: {error}</h2>}

      {loading ? (
        <h2>Cargando</h2>
      ) : (
        <>
          {chars?.length && (
            <Card
              leftClick={nextChar}
              rightClick={() => addToFavorite(chars[0])}
              {...chars[0]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePageGraphql;
