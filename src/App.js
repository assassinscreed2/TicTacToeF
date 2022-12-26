import {Grid,useMediaQuery,Button,Typography,TextField} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {ArrowBackIos,Close,PanoramaFishEye} from '@mui/icons-material';
import {useCookies} from 'react-cookie'
import Register from './components/Register';
import GamesPage from './components/GamesPage';
import Login from './components/Login'
import {Route,Routes} from 'react-router-dom'
import Invite from './components/InvitePage';
import GamePlay from './components/GamePlay';
import HomePage from './components/HomePage';

function App() {
  const theme = useTheme()
  const [cookies, setCookie] = useCookies();

  return (
    <>
    <Routes>
      <Route path="/" element={cookies.jwtoken === undefined?<HomePage />:<GamesPage />} />
      <Route path = 'login' element = {<Login />}/>
      <Route path = 'register' element = {<Register />}/>
      <Route path = 'invite' element = {<Invite />}/>
      <Route path = 'play' element = {<GamePlay />}/>
    </Routes>
    </>
  );
}

export default App;