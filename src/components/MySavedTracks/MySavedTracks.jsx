import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { savedTracksSelector } from "../../store/features/savedTracks/savedTracksSelectors";
import { getSavedTracks } from "../../store/features/savedTracks/savedTracksThunks";
import { tokenSelector } from "../../store/features/access/accessSelectors";
import Tracks from "../Tracks/Tracks";
import { Box, Input, CircularProgress } from "@mui/material";
import { loaderSelector } from "../../store/features/loader/loaderSelectors";
import useDebounce from "../SearchPage/debounce";

const MySavedTracks = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const tracks = useSelector(savedTracksSelector);
  useEffect(() => {
    if (token && tracks.length === 0) {
      dispatch(getSavedTracks());
    }
  }, [token, tracks]);

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const debouncedSearch = useDebounce(searchValue, 1000);

  const handleInput = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      const filteredTracks = tracks.filter((track) => {
        const searchingFor = debouncedSearch.toLowerCase();
        const trackName = track.name.toLowerCase();
        const artistsString = track.artists
          .map((artist) => artist.name)
          .join(", ")
          .toLowerCase();

        return (
          trackName.includes(searchingFor) ||
          artistsString.includes(searchingFor)
        );
      });
      setSearchResult(filteredTracks);
    } else {
      setSearchResult(tracks);
    }
  }, [tracks, debouncedSearch]);

  const isLoading = useSelector(loaderSelector);

  if (isLoading) return <CircularProgress />;

  if (!token) return <Redirect to="/login" />;


  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "280px" }}>
      <Input
        style={{ width: "90%", marginBottom: "2rem" }}
        placeholder="Let's find something interesting"
        value={searchValue}
        onChange={handleInput}
      ></Input>
      <Tracks tracks={searchResult} source="/music" width={1600} />
    </Box>
  );
};

export default MySavedTracks;
