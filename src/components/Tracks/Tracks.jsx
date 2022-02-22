import SongItemComponent from '../SongItemComponent/SongItemComponent'
import { useDispatch } from 'react-redux';
import { setCurrentTracks } from '../../store/features/currentTracks/currentTracksSlice';
import { useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import './Tracks.css'

const Tracks = ({ tracks, source, width, action, playlistID }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentTracks(tracks));
  }, [tracks])

  return (
    <>
      {
        tracks.length > 0 &&
        <List
          className="List"
          height={700}
          itemCount={tracks.length}
          itemSize={100}
          width={width}
        >
          {({ index, style }) => {
            const track = tracks[index];
            return <SongItemComponent
              style={style}
              key={track.id}
              track={track}
              order={index}
              source={source}
              action={action}
              playlistID={playlistID}
            />
          }}
        </List>
      }

      {/* {
        tracks.length > 0 && tracks.map((track, index) => {
          return <SongItemComponent key={track.id} track={track} order={index} source={source} />
        })
      } */}
    </>
  )
}

export default Tracks;