import {Grid,useMediaQuery,Button,Typography,TextField} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {ArrowBackIos,Close,ContentPasteSearchOutlined,LocationSearching,PanoramaFishEye} from '@mui/icons-material';
import {useNavigate,useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function GamePlay() {
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()
  const navigate = useNavigate()
  const [game,setGame] = useState()
  const [cookies, setCookie] = useCookies();
  const [position,setPostition] = useState()
  const [end, setEnd] = useState()
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()  =>{
    async function gameData(){
      const data = await fetch('http://localhost:8000/playgame',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                user1:cookies.tttuser,
                user2:location.state.otheruser
            })
        })
        const otherUserData = await data.json()
        setEnd(otherUserData.game[0].end)
        setGame(otherUserData.game[0])
        handleClose()
    }
    location.state.otheruser && gameData()
  },[location])

  const handleMove = async () => {

    if(game[position] !== "undefined"){
      console.log("invalid move")
    }else if(game[position] === cookies.tttuser){
      console.log("invalid move")
    }else{
      let obj = {}
      obj[position] = cookies.tttuser
      obj['turn'] = game.users[0] === cookies.tttuser?game.users[1]:game.users[0]
      
      console.log('game',game)
      const data = await fetch('http://localhost:8000/move',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              ...game,...obj
            })
      })
      const updatedGameData = await data.json()
      setGame(updatedGameData)
      console.log('updatedGame',updatedGameData) 
    }
  }

  const handleDelete = async () => {
    const res = await fetch('http://localhost:8000/deletegame',{
      method:'POST',
      body:JSON.stringify({
        ...game
      }),
      headers:{
        'Content-Type':'application/json'
      }
    })

    const data = await res.json();
    console.log(data)
    navigate('/')
  }

  return (
    <Grid container style={{height:"100vh"}} direction = {matchesMD?"column":"row"}>
      <Grid onClick={()=>navigate('/')} item style={{marginTop:"1em",marginBottom:"1em"}}>
        <ArrowBackIos />
      </Grid>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
      </Backdrop>
    
      {game && <>
      <Grid container item>
        <Typography style={{width:"100%",fontWeight:900,fontSize:"2em"}}>Game with {game.users[0] === cookies.tttuser?game.users[1]:game.users[0]}</Typography>
        <Typography>Your piece</Typography>
      </Grid>
      <Grid container>
        <Grid item>
          <Close fontSize='large'/>
        </Grid>
      </Grid>
      <Grid container justifyContent="center"> 
      <Grid item  container  style={{minHeight:"20em",maxHeight:"15em",maxWidth:"17em",backgroundColor:"yellow",marginTop:"2em"}}>
          <Grid item container justifyContent="center" style={{marginTop:"1em"}}>
            <Typography>Your move</Typography>
          </Grid>
          {/* x1 x2 x3 */}
          <Grid item container justifyContent="space-between"style={{marginTop:"1em"}}>
            <Grid item onClick={()=>setPostition("x1")} style={{minHeight:"5em",minWidth:"5em",maxHeight:"5em",maxWidth:"5em",backgroundColor:"white"}}>
              {position !== undefined && position === "x1" && game[position] === "undefined" ? <Close />:<></>}
              {game.x1 !== "undefined"?game.x1 === cookies.tttuser?<Close />:<PanoramaFishEye />:<></>}
            </Grid>
            <Grid item onClick={()=>setPostition("x2")} style={{minHeight:"5em",minWidth:"5em",maxHeight:"5em",maxWidth:"5em",backgroundColor:"white"}}>
            {position !== undefined && position === "x2" && game[position] === "undefined" ? <Close />:<></>}
              {game.x2 !== "undefined"?game.x2 === cookies.tttuser?<Close />:<PanoramaFishEye />:<></>}
            </Grid>
            <Grid item onClick={()=>setPostition("x3")} style={{minHeight:"5em",minWidth:"5em",maxHeight:"5em",maxWidth:"5em",backgroundColor:"white"}}>
            {position !== undefined && position === "x3" && game[position] === "undefined" ? <Close />:<></>}
              {game.x3 !== "undefined"?game.x3 === cookies.tttuser?<Close />:<PanoramaFishEye />:<></>}
            </Grid>
          </Grid>
          {/* y1 y2 y3 */}
          <Grid item container justifyContent="space-between">
            <Grid item onClick={()=>setPostition("y1")} style={{minHeight:"5em",minWidth:"5em",maxHeight:"5em",maxWidth:"5em",backgroundColor:"white"}}>
            {position !== undefined && position === "y1" && game[position] === "undefined" ? <Close />:<></>}
              {game.y1 !== "undefined"?game.y1 === cookies.tttuser?<Close />:<PanoramaFishEye />:<></>}
            </Grid>
            <Grid item onClick={()=>setPostition("y2")} style={{minHeight:"5em",minWidth:"5em",maxHeight:"5em",maxWidth:"5em",backgroundColor:"white"}}>
            {position !== undefined && position === "y2" && game[position] === "undefined" ? <Close />:<></>}
              {game.y2 !== "undefined"?game.y2 === cookies.tttuser?<Close />:<PanoramaFishEye />:<></>}
            </Grid>
            <Grid item onClick={()=>setPostition("y3")} style={{minHeight:"5em",minWidth:"5em",maxHeight:"5em",maxWidth:"5em",backgroundColor:"white"}}>
            {position !== undefined && position === "y3" && game[position] === "undefined" ? <Close />:<></>}
              {game.y3 !== "undefined"?game.y3 === cookies.tttuser?<Close />:<PanoramaFishEye />:<></>}
            </Grid>
          </Grid>
          {/* z1 z2 z3 */}
          <Grid item container justifyContent="space-between">
            <Grid item onClick={()=>setPostition("z1")} style={{minHeight:"5em",minWidth:"5em",maxHeight:"5em",maxWidth:"5em",backgroundColor:"white"}}>
            {position !== undefined && position === "z1" && game[position] === "undefined" ? <Close />:<></>}
              {game.z1 !== "undefined"?game.z1 === cookies.tttuser?<Close />:<PanoramaFishEye />:<></>}
            </Grid>
            <Grid item onClick={()=>setPostition("z2")} style={{minHeight:"5em",minWidth:"5em",maxHeight:"5em",maxWidth:"5em",backgroundColor:"white"}}>
            {position !== undefined && position === "z2" && game[position] === "undefined" ? <Close />:<></>}
              {game.z2 !== "undefined"?game.z2 === cookies.tttuser?<Close />:<PanoramaFishEye />:<></>}
            </Grid>
            <Grid item onClick={()=>setPostition("z3")} style={{minHeight:"5em",minWidth:"5em",maxHeight:"5em",maxWidth:"5em",backgroundColor:"white"}}>
            {position !== undefined && position === "z3" && game[position] === "undefined" ? <Close />:<></>}
              {game.z3 !== "undefined"?game.z3 === cookies.tttuser?<Close />:<PanoramaFishEye />:<></>}
            </Grid> 
          </Grid>
      </Grid>
      
      {
        !end && <Grid item>
          <Typography>
            Current Turn: {game && game.turn}
          </Typography>
        </Grid>
      }
      {
        end && <Grid item>
          {game.winner === "draw"?<Typography>Game is a draw</Typography>:<Typography>
            Winner of the game is {game && game.winner}
          </Typography>}
        </Grid>
      }
      </Grid>
      </>}
      {(!end && (game && game.turn === cookies.tttuser)) && <Button variant="contained" disabled={position === undefined?true:false} onClick={() => handleMove()} style={{width:"100%",marginTop:"auto"}}>Submit</Button>}
      {end && <Button variant="contained" onClick={() => handleDelete()} style={{width:"100%",marginTop:"auto"}}>Delete Game</Button>}
    </Grid>
  );
}

export default GamePlay;