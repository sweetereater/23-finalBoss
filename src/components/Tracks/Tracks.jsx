import SongItemComponent from "../SongItemComponent/SongItemComponent";
import { FixedSizeList as List } from "react-window";
import "./Tracks.css";

const Tracks = ({ tracks, source, width, action, playlistID }) => {
  return (
    <>
      {tracks.length > 0 && (
        <List
          className="List"
          height={700}
          itemCount={tracks.length}
          itemSize={100}
          width={width}
        >
          {({ index, style }) => {
            const track = tracks[index];
            return (
              <SongItemComponent
                style={style}
                key={track.id}
                track={track}
                order={index}
                source={source}
                action={action}
                playlistID={playlistID}
                tracks={tracks}
              />
            );
          }}
        </List>
      )}
    </>
  );
};

export default Tracks;
