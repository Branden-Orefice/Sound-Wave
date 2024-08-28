import { useState } from "react";
import { usePlaylist } from "../context/PlaylistContext";
import NavBar from "../components/NavBar";
import Main from "../components/Main";
import Box from "../components/Box";
import SpinnerFullPage from "../components/SpinnerFullPage";
import SearchResults from "../components/SearchResults";
import TrackList from "../components/TrackList";
import TrackPlaylist from "../components/TrackPlaylist";

function AppPage() {
  const [resetSearchValue, setResetSearchValue] = useState(false);
  const { isLoading } = usePlaylist();

  function handlePlaylistCreated() {
    setResetSearchValue(true);
    setTimeout(() => setResetSearchValue(false), 0);
  }

  return (
    <>
      <NavBar resetSearchValue={resetSearchValue} />
      <Main>
        <Box>
          {isLoading && <SpinnerFullPage />}
          {!isLoading && <TrackList />}
          <SearchResults />
        </Box>
        <Box>
          <TrackPlaylist onPlaylistCreated={handlePlaylistCreated} />
        </Box>
      </Main>
    </>
  );
}

export default AppPage;
