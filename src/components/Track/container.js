import Button from '../Button/index'

const Container = ({ imgSrc, title, artists, album, isSelected, handleSelectTrack, uri }) => {
    return (
        <div className="song-container">
            <div className="imgContainer">
                <img src={imgSrc} alt="albumImage" className="albumImage" />
            </div>
            <div className="description">
                <p className="title"> {title}</p>
                <p className="artists">{artists.map(artist => artist.name).join(', ')}</p>
                <p className="album">{album}</p>
            </div>
            <Button handleSelectTrack={handleSelectTrack} isSelected={isSelected} uri={uri}/>
        </div>
    );
}

export default Container;