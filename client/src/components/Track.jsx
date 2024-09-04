import { usePlaylist } from "../context/PlaylistContext";
import styles from "./Track.module.css";

function Track({ track, trackName, artistName, albumName, images }) {
  const { addTracks } = usePlaylist();

  function handleClick() {
    addTracks(track);
  }

  return (
    <>
      <li className={styles.track}>
        <div>
          <img src={images} />
          <h3>{trackName}</h3>

          <p>{artistName}</p>
          <p>{albumName}</p>
          <button className={styles.trackbutton} onClick={() => handleClick()}>
            +
          </button>
        </div>
      </li>
    </>
  );
}

export default Track;
