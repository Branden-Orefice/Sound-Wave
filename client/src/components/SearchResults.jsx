import { usePlaylist } from "../context/PlaylistContext";
import TrackList from "./TrackList";

function SearchResults() {
  const { search } = usePlaylist();
  return (
    <div>
      <TrackList tracks={search} />
    </div>
  );
}

export default SearchResults;
