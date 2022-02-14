import SongItemComponent from '../SongItemComponent/SongItemComponent'
import { getSongDuration } from '../../utils/timeFunctions';

const Tracks = ({ tracks }) => {
  const tracksItems = tracks.map((track, index) => {
    return {
      id: track.id,
      name: track.name,
      duration: getSongDuration(track.duration_ms),
      order: index,
      img: track.album.images[2].url,
    }
  })

  return (
    <>
      {
        tracksItems.length > 0 && tracksItems.map(track => {
          return <SongItemComponent key={track.id} {...track} />
        })
      }
    </>
  )
}

export default Tracks;