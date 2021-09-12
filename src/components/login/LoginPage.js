import React from "react";
import useUser from "../../hooks/useUser";
import styles from "./login.module.css";
import Image from "../Image";

export default function LoginPage() {
  const {
    initGoogleLogin,
    isFetching,
    currentUser,
    loggedIn,
    endSessionUser,
  } = useUser();
  return (
    <div className={styles.container}>
      {isFetching && <h2>Cargando login</h2>}

      {loggedIn ? (
        <React.Fragment>
          {currentUser?.uid && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h2>{currentUser.displayName}</h2>

                {currentUser.photoURL && (
                  <Image
                    style={{ borderRadius: 50, width: 100, height: 100 }}
                    url={currentUser.photoURL}
                    alt={currentUser.email}
                  />
                )}
              </div>
            </>
          )}

          <button onClick={endSessionUser}>Cerrar Sesión</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <button onClick={initGoogleLogin}>Inicia Sesión con Google</button>
        </React.Fragment>
      )}
    </div>
  );
}
