import { usePlaylist } from "../context/PlaylistContext";
import styles from "../components/Playlist.module.css";

function Playlist({ trackName, artistName, albumName, trackId }) {
  const { deleteTrack } = usePlaylist();

  function handleDelete() {
    deleteTrack(trackId);
  }
  return (
    <>
      <li className={styles.playlist}>
        <div>
          <h3>{trackName}</h3>

          <p>{artistName}</p>
          <p>{albumName}</p>
          <button
            className={styles.playlistbutton}
            onClick={() => handleDelete()}
          >
            -
          </button>
        </div>
      </li>
    </>
  );
}

export default Playlist;
