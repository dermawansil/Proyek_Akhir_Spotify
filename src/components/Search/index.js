import axios from 'axios';
import { useState, useEffect } from 'react';
import Tracks from '../Track';

const Search = ({ accessToken }) => {
    const [tracksData, setTracksData] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedTracks, setSelectedTracks] = useState();

    useEffect(() => {
        fetchTracks();
    }, [])
    
    const filterTracks = () => {
        return tracksData.filter((track) => setSelectedTracks.includes(track.uri));
    };

    const fetchTracks = () => {
        const filteredTracks = filterTracks();
        const distinctTracks = tracksData.filter(
            (track) => !selectedTracks.includes(track.uri)
        );
        setTracksData([...filteredTracks, ...distinctTracks]);
    };

    const getTracks = async (accessToken) => {
        const data = await axios
            .get(
                `https://api.spotify.com/v1/search?q=${query}&type=track&access_token=${accessToken}`
            )
            .then((response) => response)
            .catch((error) => error)
        setTracksData(data.data.tracks.items);
        console.log(data);
    }

    const handleSelectTrack = (tracksData) => {
        let uri = tracksData.uri;
        if (selectedTracks.includes(uri)) {
            setSelectedTracks(selectedTracks.filter((item) => item !== uri));
        } else {
            setSelectedTracks([...selectedTracks, uri]);
        }
    };

    const handleOnChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSelectButton = () => {
        setSelectedTracks(!selectedTracks);
        handleSelectTrack();
    };

    return (
        <div className="home">
            <div className="search-container">
                <input className="input-search" onChange={handleOnChange}></input>
                <button onClick={() => { getTracks(accessToken) }} className="searchButton">
                    Search
                </button>
            </div>
            <br />
            <div className="grid-container">
                {tracksData !== undefined && (
                    <Tracks tracksData={tracksData}
                        text={selectedTracks ? "Deselect" : "Select"}
                        onClick={handleSelectButton}
                        type={selectedTracks ? "secondary" : "primary"} />
                )}
            </div>
        </div>
    )
}

export default Search;