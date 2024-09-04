import { useEffect, useState } from "react";
import { usePlaylist } from "../context/PlaylistContext";
import { logout } from "../Spotify";
import styles from "../components/SearchBar.module.css";

function SearchBar({ resetSearchValue }) {
  const [searchValue, setSearchValue] = useState("");
  const { searchTracks, clearSearch } = usePlaylist();

  useEffect(
    function () {
      if (resetSearchValue) {
        setSearchValue("");
      }
    },
    [resetSearchValue]
  );

  function handleSubmit(e) {
    e.preventDefault();
    searchTracks(searchValue);
  }

  function handleChange(e) {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim() === "") {
      clearSearch();
    }
  }

  return (
    <>
      <input
        className={styles.searchbar}
        placeholder="Song, Album, or Artist..."
        type="text"
        value={searchValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit(e);
        }}
      />
      <div className={styles.button}>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export default SearchBar;
