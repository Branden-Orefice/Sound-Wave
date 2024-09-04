import { usePlaylist } from "../context/PlaylistContext";
import Spinner from "./Spinner";
import Track from "./Track";
import styles from "./TrackList.module.css";

function TrackList({ tracks }) {
  const { isLoading } = usePlaylist();

  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.tracklist}>
      {tracks?.map((track) => (
        <Track
          key={track.uri}
          track={track}
          trackName={track.name}
          artistName={track.artist}
          albumName={track.album}
          popularity={track.popularity}
          duration={track.duration_ms}
          images={track.images}
        />
      ))}
    </ul>
  );
}

export default TrackList;
