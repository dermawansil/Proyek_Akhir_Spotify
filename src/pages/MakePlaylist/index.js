import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import Tracks from '../../components/Track';
import Playlist from '../../components/Playlist';
import Profile from '../Profile';

const MakePlaylist = () => {
    const [tracksData, setTracksData] = useState([]); 
    const [query, setQuery] = useState("");
    const [selectedTracks, setSelectedTracks] = useState([]); 
    const [mergedTracks, setMergedTracks] = useState([]);
    const accessToken = useSelector((state) => state.accessToken.value); 
    const user_id = useSelector((state) => state.user.value.user_id); 

    useEffect(() => {
        const mergedTracksWithSelectedTracks 
            = tracksData.map((track) => ({
                ...track,
                isSelected: !!selectedTracks.find((selectedTrack) => selectedTrack === track.uri), // if track is selected, set isSelected to true
            }));
        setMergedTracks(mergedTracksWithSelectedTracks); // set merged tracks
    }, [selectedTracks, tracksData]);

    //Track things
    const handleSelectTrack = (uri) => {
        const alreadySelected = selectedTracks.find(selectedTrack => selectedTrack === uri) // if track is already selected
        if (alreadySelected) {
            setSelectedTracks(selectedTracks.filter(selectedTrack => selectedTrack !== uri)); // remove track from selected tracks
        }
        else {
            setSelectedTracks((selectedTracks) => [...selectedTracks, uri]); // add track to selected tracks
        }
        console.log(selectedTracks);
    };

    const handleGetTracksData = async () => {
        const data = await axios //get tracks data
            .get(
                `https://api.spotify.com/v1/search?q=${query}&type=track&access_token=${accessToken}`
            )
            .then((response) => response)
            .catch((error) => error)
        setTracksData(data.data.tracks.items); //set tracks data
        console.log(data);
    }

    const handleSearchOnChange = (e) => {
        setQuery(e.target.value); // set query in state
    }

    const handleSearchOnSubmit = (e) => {
        e.preventDefault();
        handleGetTracksData();
    }

    const [addPlaylistData, setAddPlaylistData] = useState({
        title: '',
        description: '',
    })

    const bodyParams = { 
        name: addPlaylistData.title,
        description: addPlaylistData.description,
        collaborative: false,
        public: false
    }

    const header = {
        Authorization: `Bearer ${accessToken}` // set access token in header
    }

    const handleAddPlaylistOnChange = e => {
        const { name, value } = e.target;
        setAddPlaylistData({ ...addPlaylistData, [name]: value }); // set playlist data in state
    }

    const handleAddPlaylistOnSubmit = async (e) => {
        e.preventDefault();
        const data = await axios //create playlist
            .post(
                `https://api.spotify.com/v1/users/${user_id}/playlists`, bodyParams,
                {
                    headers: header
                }
            )
            .catch((error) => error)
        console.log("Playlist created: ", data);
                selectedTracks.length > 0 &&
        handleAddItemToPlaylist(data.data.id);
    }

    //add Item to Playlist Things
    const itemParams = { // item params for add item to playlist
        uris: selectedTracks
    }

    const handleAddItemToPlaylist = async (playlist_id) => {
        const data = await axios //add items to playlist
            .post(
                `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, itemParams,
                {
                    headers: header
                }
            )
            .catch((error) => error);
        console.log("Items added to playlist: ", data);
    }

    return (
        <>
            <h1>Spotify</h1>
            <Profile />
            <Playlist
                handleAddPlaylistOnChange={handleAddPlaylistOnChange}
                handleAddPlaylistOnSubmit={handleAddPlaylistOnSubmit}
                addPlaylistData={addPlaylistData} />
            <SearchBar
                onSubmit={handleSearchOnSubmit}
                onChange={handleSearchOnChange} />
            <br />
            <div className="grid-container">
                {mergedTracks !== undefined && ( 
                    <Tracks
                        mergedTracks={mergedTracks}
                        handleSelectTrack={handleSelectTrack} key={mergedTracks.uri} />
                )}
            </div>
        </>
    )
}

export default MakePlaylist;