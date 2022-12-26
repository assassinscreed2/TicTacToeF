import {Grid,useMediaQuery,Button,Typography} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {useNavigate} from 'react-router-dom'

function HomePage() {
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  return (
    <Grid container style={{height:"100vh"}} direction = {matchesMD?"column":"row"} alignItems = {matchesMD?"center":undefined} justifyContent="space-evenly">
      <Grid item >
        <Typography style={{fontFamily:'Courgette',fontSize:"2em"}}>
          async
        </Typography>
      </Grid>
      <Grid item>
        <Typography align="center" style={{fontFamily:'Courgette',fontSize:"5em"}}>tic tac toe</Typography>
      </Grid>
      <Grid item container>
        <Button variant='contained' onClick={()=>navigate('/login')} style={{width:"100%",marginBottom:"2em",backgroundColor:"#F2C94C"}}>Login</Button>
        <Button variant = 'contained' onClick={()=>navigate('/register')} style={{width:"100%",backgroundColor:"#F2C94C"}}>Register</Button>
      </Grid>
    </Grid>
  );
}

export default HomePage;