import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';
import Login from '../Login';
import { setAccessToken } from "../../data/redux/accessTokenSlice"

const Home = () => {
  // const [accessToken, setAccessToken] = useState()
  const accessToken = useSelector((state) => state.accessToken.value) 
  const dispatch = useDispatch(); 
  const history = useHistory(); 

  useEffect(() => {
    const parsed = queryString.parse(window.location.hash); 
    dispatch(setAccessToken(parsed.access_token)); 
  }, [accessToken, dispatch])

  useEffect(() => {
    accessToken !== undefined && (
      history.push("create-playlist") 
    )
  }, [accessToken, history])

  return (
    <div className="Home">
      <h1>Welcome</h1>
      <Login />
    </div>
  )
}

export default Home;