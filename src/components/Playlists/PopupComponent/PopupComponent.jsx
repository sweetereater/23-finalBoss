import React from "react";
import "./PopupComponent.css";
import Button from "@mui/material/Button";

export const PopupComponent = (props) => {
  return (
    <div className="PopupArea">
      <h4>Sorry, Api-spotify doesn't provide this option.</h4>
      <div>
        <img
          src="https://stickers.wiki/static/stickers/opgdobro/file_289450.webp?ezimgfmt=rs:112x134/rscb1/ng:webp/ngcb1"
          alt={"Sorry about this"}
          title={"Sorry about this"}
          className={"popupImage"}
        />
      </div>
      <Button
        variant="outlined"
        onClick={() => {
          props.answerPopup(false);
        }}
      >
        Ok
      </Button>
    </div>
  );
};
