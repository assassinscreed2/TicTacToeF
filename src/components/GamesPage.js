import {Grid,useMediaQuery,Button,Typography,Card,CardContent,CardActions} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import { useEffect, useState } from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
  import CircularProgress from '@mui/material/CircularProgress';

function GamesPage() {
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const [gamesData,setGameData] = useState()
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate()
  const [open, setOpen] = useState(true);
  

  const handleClose = () => {
    setOpen(false);
  };

  function handleNewGame(){
    navigate('/invite')
  }

  function handleViewGame(game){
    navigate('/play',{state:{otheruser: game.users[1] === cookies.tttuser?game.users[0]:game.users[1]}})
  }

  useEffect(()=>{
    async function getGameData(){
      const data = await fetch('https://tictactoebackend-t2lr.onrender.com/home',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          user:cookies.tttuser
        })
      })
      const responseData = await data.json()
      responseData.sort(function(a, b){
        const date1 = new Date(a.time)
        const date2 = new Date(b.time)
        
        return date2-date1;
    })
      setGameData(responseData)
      handleClose()
    }

    getGameData()
  },[])


  return (
    <Grid container >
      <Grid item >
        <Typography style={{fontSize:"1.5em",fontWeight:600}}>
          Your Games
        </Typography>
      </Grid>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container style={{height:"100vh"}}  direction = {matchesMD?"column":"row"} alignItems = {matchesMD?"center":undefined} justifyContent="space-evenly">
        {
          gamesData && gamesData.length !==0 ? 
            gamesData.map((game,i)=>(<Card style={{width:"100%"}}>
              <CardContent>
                <Typography variant="h5" style={{fontWeight:600}}>
                  Game with {game.users[0] === cookies.tttuser?game.users[1]:game.users[0]}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {
                    game.turn !== cookies.tttuser? <>{game.users[0] === cookies.tttuser?game.users[1]:game.users[0]} has to move</>:
                    <>{game.users[0] === cookies.tttuser?game.users[1]:game.users[0]} just muade their move!. Its your turn to play now</>
                  }
                </Typography>
                <Typography>
                  {
                    game.time
                  }
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={()=>handleViewGame(game)} size="small" variant='contained' style={{width:"100%",backgroundColor:"#F2C94C"}}>View game</Button>
              </CardActions>
            </Card>
            ))
           : <><Grid item>
          <Typography align="center" style={{fontFamily:'Courgette',fontSize:"5em"}}>No Games Found</Typography>
        </Grid>
        <Grid item container>
          <Button variant='contained' onClick={()=>handleNewGame()} style={{width:"100%",marginBottom:"2em",backgroundColor:"#F2C94C"}}>Start a new game</Button>
        </Grid></>
        }
        
      </Grid>
      {
        gamesData && gamesData.length !==0 && <Grid item style={{position:"absolute",marginLeft:matchesMD?"15em":undefined,marginTop:matchesMD?"37em":undefined}}>
        <Button onClick={()=>handleNewGame()} style={{backgroundColor:"#F2C94C"}} variant='contained'>New Game</Button>
      </Grid>
      }
      
    </Grid>
    
  );
}

export default GamesPage;