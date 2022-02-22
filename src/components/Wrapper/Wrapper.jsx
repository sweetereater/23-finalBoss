import { isFocusable } from "@testing-library/user-event/dist/utils";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedTracks } from "../../store/features/savedTracks/savedTracksThunks";

export const Wrapper = ({ accessToken }) => {
  const dispatch = useDispatch();
  window.history.pushState({}, null, "/");

  useEffect(() => {
    console.log("Дергаем санку");
    dispatch(getSavedTracks());
  }, []);

  return (
    <div>
      <p>{accessToken}</p>
    </div>
  );
};
