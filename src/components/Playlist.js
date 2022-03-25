import React from "react";
import { PlaylistAlbum } from "./PlaylistAlbum";
import { PlaylistArtist } from "./PlaylistArtist";
import { PlaylistImages } from "./PlaylistImage";
import { PlaylistTitle } from "./PlaylistTitle";

const Playlist = ({url, title, artist, album}) => {
    return (
        <div className="playlist">
            <PlaylistImages imagesUrl={url} />
            <PlaylistTitle title={title} />
            <PlaylistArtist artisName={artist} />
            <PlaylistAlbum albumName={album} />
            <button>Play</button>
        </div>
    )
}

export {
    Playlist
}