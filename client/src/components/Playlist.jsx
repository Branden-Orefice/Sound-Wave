import { usePlaylist } from "../context/PlaylistContext";
import styles from "../components/Playlist.module.css";

function Playlist({ trackName, artistName, albumName, trackId, images }) {
  const { deleteTrack } = usePlaylist();

  function handleDelete() {
    deleteTrack(trackId);
  }
  return (
    <>
      <li className={styles.playlist}>
        <div>
          <img src={images} />
          <h3>{trackName}</h3>
          <p>{artistName}</p>
          <p>{albumName}</p>
        </div>
        <button
          className={styles.playlistbutton}
          onClick={() => handleDelete()}
        >
          -
        </button>
      </li>
    </>
  );
}

export default Playlist;
