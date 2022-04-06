import Search from '../Search/index'
import queryString from 'query-string';
import { useEffect } from 'react';
import Login from '../Login/index'
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../data/redux/accessTokenSlice"

const Home = () => {
  // const [accessToken, setAccessToken] = useState();
  const accessToken = useSelector((state) => state.accessToken.value)
  const dispatch = useDispatch();

  useEffect(() => {
    const parsed = queryString.parse(window.location.hash);
    dispatch(setAccessToken(parsed.access_token));
  }, [accessToken, dispatch])

  return (
    <div className="Home">
      <h1>Spotify</h1>
      {accessToken !== undefined ? (
        <>
          <Search />
        </>
      )
        :
        (<Login />)}
    </div>
  )
}

export default Home;