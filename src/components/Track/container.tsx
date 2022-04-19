export type Tracks = {
    imgSrc: string,
    title:string,
    artists: array<{
        name:string,
        id:string,
    }>,

    album:string,
    uri:string,
    handleSelectTrack: (uri:string) => void,
    isSelected:boolean,
}


const Container = ({ imgSrc, title, artists, album, isSelected, handleSelectTrack, uri }) => {
    return (
        <div className="grid-item">
            <div className="img-container">
                <img src={imgSrc} alt={album} className="img album" />
            </div>
            <div className="description">
                <p className="title"> {title}</p>
                <p className="artists">{artists.map(artist => artist.name).join(', ')}</p>
                <p className="album">{album}</p>
                <button className= {isSelected? "btn selected" : "btn unselected"} onClick={() => handleSelectTrack(uri)}>{isSelected ? 'Deselect':'Select'}</button>
            </div>
            
        </div>
    );
}

export default Container;