import Container from './container';

const Tracks = ({ mergedTracks, handleSelectTrack }) => {
  return mergedTracks.map((track) => {
    const { uri } = track;
    return (
        <Container
          key={track.id}
          uri={uri}
          imgSrc={track.album.images[1].url}
          title={track.name}
          artists={track.artists}
          album={track.album.name}
          handleSelectTrack={handleSelectTrack} 
          isSelected={track.isSelected}      
        />
    )
  });
}

export default Tracks;