import { createContext, useContext, useReducer } from "react";
import { accessToken } from "../Spotify";

const BASE_URL = "https://api.spotify.com/v1";
const userToken = accessToken;
const header = {
  Authorization: `Bearer ${userToken}`,
  "Content-Type": "application/json",
};

const PlaylistContext = createContext();

const initialState = {
  playlist: [],
  search: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "tracks/loaded":
      return {
        ...state,
        isLoading: false,
        search: action.payload,
      };

    case "track/added":
      return {
        ...state,
        isLoading: false,
        playlist: [...state.playlist, action.payload],
      };

    case "track/deleted":
      return {
        ...state,
        isLoading: false,
        playlist: state.playlist.filter((track) => track.id !== action.payload),
      };

    case "playlist/created":
      return {
        ...state,
        isLoading: false,
        playlist: [...state.playlist, action.payload],
      };

    case "clear/playlist":
      return {
        ...state,
        isLoading: false,
        playlist: [],
        search: [],
      };

    case "clear/search":
      return {
        ...state,
        isLoading: false,
        search: [],
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function PlaylistProvider({ children }) {
  const [{ search, playlist, isLoading, searchResult }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function searchTracks(term) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(
        `${BASE_URL}/search?type=track&q=${term}&limit=50`,
        { method: "GET", headers: header }
      );
      const data = await response.json();
      const items = data.tracks.items;
      const tracks = items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        popularity: track.popularity,
        duration: track.duration_ms,
        images: track.album.images[2]?.url,
      }));
      dispatch({ type: "tracks/loaded", payload: tracks });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading tracks",
      });
    }
  }

  async function addTracks(track) {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "track/added", payload: track });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error adding track",
      });
    }
  }

  async function deleteTrack(id) {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "track/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting track",
      });
    }
  }

  async function createPlaylist(name, trackUris) {
    if (!name || !trackUris) return;
    let userId;

    try {
      // Gets the users data
      const userResponse = await fetch(`${BASE_URL}/me`, {
        headers: header,
      });

      if (!userResponse.ok)
        dispatch({ type: "rejected", payload: "Failed to fetch user data" });

      const userJson = await userResponse.json();
      userId = userJson.id;

      // Posts tracks to playlist
      const playlistResponse = await fetch(
        `${BASE_URL}/users/${userId}/playlists`,
        {
          headers: header,
          method: "POST",
          body: JSON.stringify({ name: name }),
        }
      );

      if (!playlistResponse.ok)
        dispatch({ type: "rejected", payload: "Failed to create playlist" });

      const playlistJson = await playlistResponse.json();
      const playlistId = playlistJson.id;

      // Posts playlist to users spotify
      const tracksResponse = await fetch(
        `${BASE_URL}/playlists/${playlistId}/tracks`,
        {
          headers: header,
          method: "POST",
          body: JSON.stringify({ uris: trackUris }),
        }
      );
      dispatch({ type: "playlist/created", payload: { name, trackUris } });

      if (!tracksResponse.ok)
        dispatch({
          type: "rejected",
          payload: "Failed to add tracks to playlist",
        });

      return await tracksResponse.json();
    } catch {
      dispatch({ type: "rejected", payload: "There was an error" });
    }
  }

  async function clearPlaylist() {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "clear/playlist" });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error clearing playlist",
      });
    }
  }

  async function clearSearch() {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "clear/search" });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error clearing search",
      });
    }
  }

  return (
    <PlaylistContext.Provider
      value={{
        search,
        playlist,
        isLoading,
        searchResult,
        searchTracks,
        addTracks,
        deleteTrack,
        createPlaylist,
        clearPlaylist,
        clearSearch,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (context === undefined)
    throw new Error("PlaylistContext was used outside of the PlaylistProvider");
  return context;
}

export { PlaylistProvider, usePlaylist };
