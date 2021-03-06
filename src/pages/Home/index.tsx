import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../data/hooks';
import queryString from 'query-string';
import Login from '../Login';
import { setAccessToken } from "../../data/redux/accessTokenSlice"
import { ChakraProvider, Text } from '@chakra-ui/react';

const Home = () => {
  // const [accessToken, setAccessToken] = useState()
  const accessToken = useAppSelector((state: any) => state.accessToken.value) // get access token from redux store
  const dispatch = useAppDispatch();
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
    <ChakraProvider>
      <Text color= 'blue' font-style="italic" 
      Welcome  ></Text>

      <Login />

    </ChakraProvider>
  )
}

export default Home;