import { useState } from "react";
import { usePlaylist } from "../context/PlaylistContext";
import PlaylistSummary from "./PlaylistSummary";
import styles from "../components/TrackPlaylist.module.css";

function TrackPlaylist({ onPlaylistCreated }) {
  const [playlistName, setPlaylistName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const { isLoading, createPlaylist, clearPlaylist, playlist } = usePlaylist();

  function handleSavePlaylist() {
    const trackUris = playlist?.map((track) => track.uri);
    setIsSaved(true);
    createPlaylist(playlistName, trackUris);
    onPlaylistCreated();
  }

  function handleSaveAndReset() {
    setIsSaved(false);
    setPlaylistName("");
    clearPlaylist();
  }

  return (
    <div className={styles.playlist}>
      {!isSaved ? (
        <>
          <PlaylistSummary />
          <div className={styles.inputs}>
            <input
              className={styles.playlistbar}
              type="text"
              placeholder="Create Playlist..."
              value={playlistName}
              required
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <button onClick={() => handleSavePlaylist()} disabled={isLoading}>
              Create
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.closedplaylist}>
            <h3>Thanks for using Sound Wave! ✌️</h3>
            <p>
              Head over to Spotify and share your playlist with your friends!
            </p>
            <button onClick={() => handleSaveAndReset()}>
              Create Another Playlist
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TrackPlaylist;
