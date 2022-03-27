import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import data from './data';
import './style.css';
import { Playlist } from './components/Playlist';


console.log(data);


function App() {
    const [fetchData, setFetchData] = useState(null);

    useEffect(() => {
        axios.get('https://gist.githubusercontent.com/aryapradipta9/0b8d0a1a113e3594d34c68c72ec32daf/raw/cb5d20b494bd2cb259d31596b9e8eea02e0f6d1e/single-sample.js', {})
            .then((response) => {
                setFetchData(response.data)
            })
    }, [])

    console.log(fetchData === null ? 'loading' : fetchData)


    return (
        <div className="App">
            {/* {url, title, artist, album} */}
            <div className='playlists'>
                {/* <Playlist url={data.album.images[0].url} title={data.name} artist={data.artists[0].name} album={data.album.name} /> */}
                {
                    data.map(item => {
                        return(
                        
                                <Playlist 
                                    key={item.id} 
                                    url={item.album.images[0].url} 
                                    title={item.name} 
                                    artist={item.artists[0].name} 
                                    album={item.album.name} />
                                 
                        )
                    }) 
                }
                
            </div>
        </div>
    );
}

export default App;
