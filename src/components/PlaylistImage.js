import React from "react";

const PlaylistImages = ({imagesUrl}) => {
    return (
        <div className="playlist-pict">
        <img
            src={imagesUrl}
            alt="cover-pict"
        />
    </div>
    )
}

export {
    PlaylistImages
}