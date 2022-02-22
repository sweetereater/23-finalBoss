import Tracks from "../Tracks/Tracks";
import { spotifyApi } from "../../store/spotifyAPI";
import { Redirect } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { tokenSelector } from "../../store/features/access/accessSelectors";
import useDebounce from "./debounce";

import { Box, Input } from "@mui/material";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [source, setSource] = useState("");
  const token = useSelector(tokenSelector);

  const debouncedSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (!token) return;
    if (debouncedSearch) {
      spotifyApi.searchTracks(debouncedSearch, { limit: 50 }).then((res) => {
        console.log(res.body);
        setSearchResult(res.body.tracks.items);
        setSource(res.body.tracks.href);
      });
    } else setSearchResult([]);
  }, [token, debouncedSearch]);

  const handleInput = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  if (!token) return <Redirect to="/login" />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "280px" }}>
      <Input
        style={{ width: "80%", marginBottom: "2rem" }}
        placeholder="Search music..."
        value={searchValue}
        onChange={handleInput}
      ></Input>
      <Tracks tracks={searchResult} source={source} width={1600} />
    </Box>
  );
};

export default SearchPage;
