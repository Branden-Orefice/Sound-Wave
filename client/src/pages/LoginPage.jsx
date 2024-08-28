import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spotify from "../Spotify";
import styles from "../pages/LoginPage.module.css";
import process from "process";

function LoginPage() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(function () {
    const accessToken = Spotify.getAccessToken();
    setToken(accessToken);
  }, []);

  useEffect(
    function () {
      if (token) {
        navigate("/AppPage");
      }
    },
    [token, navigate]
  );

  const REACT_APP_LOGIN_URI =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8888/login"
      : "https://sound-wave-app-efde8f11e684.herokuapp.com/";

  function handleLogin() {
    window.location.href = REACT_APP_LOGIN_URI;
  }

  return (
    <main className={styles.loginpage}>
      <section>
        <h1>Sound Wave</h1>
        <h2>Create playlists and share with your friends</h2>
        {!token ? (
          <button className={styles.button} onClick={handleLogin}>
            Log In To Spotify
          </button>
        ) : (
          <p>Youre already logged in!</p>
        )}
      </section>
    </main>
  );
}

export default LoginPage;
