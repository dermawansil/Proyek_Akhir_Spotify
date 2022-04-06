import Search from '../../components/Search';
import queryString from 'query-string';
import { useState, useEffect } from 'react';
import Login from '../Login/index'

const Home = () => {
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const parsed = queryString.parse(window.location.hash);
    setAccessToken(parsed.access_token);
  }, [accessToken])

  return (
    <div className="Home">
      <h1>Spotify</h1>
      {accessToken !== undefined ? (
        <>
          <Search accessToken={accessToken}/>              
        </>
      )
        :
        (<Login />)}
    </div>
  )
}

export default Home;