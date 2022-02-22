import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

export const PlayListCard = (props) => {
  return (
    <Box
      sx={{
        padding: "2rem",
        borderRadius: "8px",
        position: "relative",
        "&:hover": {
          backgroundColor: "#ededed",
        },
      }}
    >
      <Link to={`/playlists/${props.id}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "flex", md: "flex" } }}
          >
            {props.name}
          </Typography>
          <Box sx={{ width: "320px", height: "320px" }}>
            {props.images[0]?.url && (
              <img
                width="100%"
                height="100%"
                src={props.images[0].url}
                alt="Обложка плейлиста"
              />
            )}
          </Box>
        </Box>
      </Link>
      <Box onClick={props.popupActivation}>
        <CloseIcon
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            fill: "grey",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          titleAccess={"Remove playlist"}
        />
      </Box>
    </Box>
  );
};
