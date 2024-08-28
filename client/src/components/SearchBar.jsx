import { useEffect, useState } from "react";
import { usePlaylist } from "../context/PlaylistContext";
import Spotify from "../Spotify";
import styles from "../components/SearchBar.module.css";

function SearchBar({ resetSearchValue }) {
  const [searchValue, setSearchValue] = useState("");
  const { searchTracks } = usePlaylist();

  function handleSubmit(e) {
    e.preventDefault();
    searchTracks(searchValue);
  }

  useEffect(
    function () {
      if (resetSearchValue) {
        setSearchValue("");
      }
    },
    [resetSearchValue]
  );

  return (
    <>
      <input
        className={styles.searchbar}
        placeholder="Song, Album, or Artist..."
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit(e);
        }}
      />
      <div className={styles.button}>
        <button onClick={Spotify.logout}>Logout</button>
      </div>
    </>
  );
}

export default SearchBar;
