import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Tracks from '../../components/Tracks/index';
import Profile from '../Profile';
import Playlist from '../Playlist';
import { useSelector } from 'react-redux';

const Search = () => {
    const [tracksData, setTracksData] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [mergedTracks, setMergedTracks] = useState([]);
    const accessToken = useSelector((state) => state.accessToken.value)
    const user_id = useSelector((state) => state.user.value.user_id)

    useEffect(() => {
        const mergedTracksWithSelectedTracks
            = tracksData.map((track) => ({
                ...track,
                isSelected: !!selectedTracks.find((selectedTrack) => selectedTrack === track.uri),
            }));
        setMergedTracks(mergedTracksWithSelectedTracks);
    }, [selectedTracks, tracksData]);

    //Track things
    const handleSelectTrack = (uri) => {
        const alreadySelected = selectedTracks.find(selectedTrack => selectedTrack === uri)
        if (alreadySelected) {
            setSelectedTracks(selectedTracks.filter(selectedTrack => selectedTrack !== uri))
        }
        else {
            setSelectedTracks((selectedTracks) => [...selectedTracks, uri])
        }
        console.log(selectedTracks)
    };

    const handleGetTracksData = async (accessToken) => {
        const data = await axios
            .get(
                `https://api.spotify.com/v1/search?q=${query}&type=track&access_token=${accessToken}`
            )
            .then((response) => response)
            .catch((error) => error)
        setTracksData(data.data.tracks.items);
        console.log(data);
    }

    const handleSearchChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleGetTracksData(accessToken)
    }

    //User Things
    //Playlist things
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
        Authorization: `Bearer ${accessToken}`
    }

    const handleAddPlaylistOnChange = e => {
        const { name, value } = e.target;
        setAddPlaylistData({ ...addPlaylistData, [name]: value })
    }

    const handleAddPlaylistOnSubmit = async e => {
        e.preventDefault();
        console.log(addPlaylistData);
        await axios
            .post(
                `https://api.spotify.com/v1/users/${user_id}/playlists`, bodyParams,
                {
                    headers: header
                }
            )
            .then((response) => (
                handleAddItemToPlaylist(response.data.id)))
            .catch((error) => error)
    }

    //add Item to Playlist Things
    const itemParams = {
        uris: selectedTracks
    }

    const handleAddItemToPlaylist = async (id) => {
        const data = await axios
            .post(
                `https://api.spotify.com/v1/playlists/${id}/tracks`, itemParams,
                {
                    headers: header
                }
            )
            .catch((error) => error)
        console.log(data);
    }

    return (
        <>
            <Profile />
            {user_id !== undefined && (
                <>
                    <Playlist
                        handleAddPlaylistOnChange={handleAddPlaylistOnChange}
                        handleAddPlaylistOnSubmit={handleAddPlaylistOnSubmit}
                        addPlaylistData={addPlaylistData}/>
                    <SearchBar
                        onSubmit={handleSearchSubmit}
                        onChange={handleSearchChange} />
                </>
            )}
            <br />
            <div className="grid-container">
                {mergedTracks !== undefined && (
                    <Tracks
                        mergedTracks={mergedTracks}
                        handleSelectTrack={handleSelectTrack} />
                )}
            </div>
        </>
    )
}

export default Search;