import { Link, useNavigate } from "react-router-dom";
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
      ? "https://sound-wave-app-efde8f11e684.herokuapp.com/login"
      : "http://localhost:8888/login";

  return (
    <main className={styles.loginpage}>
      <section>
        <h1>Sound Wave</h1>
        <h2>Create playlists and share with your friends</h2>
        {!token ? (
          <Link to={`${REACT_APP_LOGIN_URI}`}>
            <button className={styles.button}>Log In To Spotify</button>
          </Link>
        ) : (
          <p>Youre already logged in!</p>
        )}
      </section>
    </main>
  );
}

export default LoginPage;
