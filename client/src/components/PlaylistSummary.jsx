import { usePlaylist } from "../context/PlaylistContext";
import Playlist from "./Playlist";
import styles from "./PlaylistSummary.module.css";

function PlaylistSummary() {
  const { playlist } = usePlaylist();

  const totalTracks = playlist.length;
  const totalPopularity =
    playlist.reduce((sum, track) => sum + track.popularity, 0) / totalTracks;
  const totalPlaylistTime = playlist.reduce(
    (sum, track) => sum + track.duration,
    0
  );

  const hours = Math.floor(totalPlaylistTime / 3600000);
  const minutes = Math.floor((totalPlaylistTime % 3600000) / 60000);

  return (
    <>
      <div className={styles.summary}>
        <h2>Tracks You Added</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{totalTracks} tracks</span>
          </p>
          <p>
            <span>⭐</span>
            <span>
              {totalPopularity ? totalPopularity.toFixed(1) : 0} rating
            </span>
          </p>
          <p>
            <span>⏳</span>
            <span>
              {hours > 0 ? `${hours} hours` : " "} {minutes} mins
            </span>
          </p>
        </div>
      </div>
      <ul className={styles.playlistTracks}>
        {playlist.map((track) => (
          <Playlist
            key={track.id}
            trackId={track.id}
            trackName={track.name}
            artistName={track.artist}
            albumName={track.album}
            popularity={track.popularity}
            duration={track.duration_ms}
          />
        ))}
      </ul>
    </>
  );
}

export default PlaylistSummary;
