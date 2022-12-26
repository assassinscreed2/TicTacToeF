import {Grid,useMediaQuery,Button,Typography,TextField} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {ArrowBackIos,Close,PanoramaFishEye} from '@mui/icons-material';
import { useState } from 'react';
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

function Invite() {
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
    const [otherUser,setOtherUser] = useState()
    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate()

    async function handleStart(){
        const data = await fetch('https://tictactoebackend-t2lr.onrender.com/playgame',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                user1:cookies.tttuser,
                user2:otherUser
            })
        })
        const otherUserData = await data.json()

        if(otherUserData.message === 'exist'){
            otherUserData.game && navigate('/play',{state:{otheruser: otherUserData.game[0].users[1] === cookies.tttuser?otherUserData.game[0].users[0]:otherUserData.game[0].users[1]}})
        }
    }
  
    return (
      <Grid container style={{height:"100vh"}} direction = {matchesMD?"column":"row"}>
        <Grid onClick={()=>navigate('/')} item style={{marginTop:"1em",marginBottom:"1em"}}>
          <ArrowBackIos />
        </Grid>
        <Grid container item>
          <Typography style={{width:"100%",fontWeight:900}}>Start a new game</Typography>
          <Typography style={{width:"100%",fontWeight:900,fontSize:"2em"}}>Whom do you want to play with?</Typography>
        </Grid>
        <Grid item container style={{marginTop:"2em"}}>
            <Typography style={{fontWeight:900}}>User Name</Typography>
            <TextField style={{width:"100%"}} onChange = {(e) => setOtherUser(e.target.value)} placeholder='Type your name here' variant='filled'/>
        </Grid>
        <Grid item container style={{marginTop:"auto"}}>
          <Button onClick={() => handleStart()} variant="contained" style={{width:"100%"}}>Start Game</Button>
        </Grid>
      </Grid>
    );
  }
  
  export default Invite;