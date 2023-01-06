import {Grid,useMediaQuery,Button,Typography,TextField,Snackbar,Backdrop,CircularProgress} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {ArrowBackIos} from '@mui/icons-material';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'

function Login() {
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const [cookies, setCookie] = useCookies();

  const navigate = useNavigate();
  const [user,setUser] = useState("")
  const [password,setPassword] = useState("")
  const [open,setOpen] = useState(false)
  const [openLoading, setOpenLoading] = useState(false);

  const handleLogin = async () => {
    setOpenLoading(true)
    const response = await fetch('http://localhost:8000/login',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      }
      ,
      body: JSON.stringify({
        user: user,
        password: password
      })
    })

    const responseData = await response.json();

    if(responseData.message === 'not exists'){
      return navigate('/register')
    }else if(responseData.message === 'Incorrect Password'){
      handleOpen()
      setTimeout(()=>handleClose(),2000)
      return;
    }
    setCookie('tttuser',responseData.user,{expires:new Date(Date.now() + 25892000000)})
    setOpenLoading(false)
    navigate('/')
  }

  const handleOpen = () => {
    setOpen({open: true});
  };

  const handleClose = () => {
    setOpen({open: false});
  };

  return (
    <Grid container justifyContent="center" style={{height:matchesMD?"100vh":"30em"}} direction = {matchesMD?"column":"row"}>
      <Grid onClick={()=>navigate('/')} item style={{marginTop:"1em",marginBottom:"1em",marginRight:"auto",marginLeft:"1em"}}>
        <ArrowBackIos />
      </Grid>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container item>
        <Typography style={{width:"100%",fontWeight:900}}  align={matchesMD?undefined:"center"}>Login</Typography>
        <Typography style={{width:"100%",fontWeight:900,fontSize:"2em"}}  align={matchesMD?undefined:"center"}>Please Enter your details</Typography>
      </Grid>
      <Grid item container style={{marginTop:"2em"}} justifyContent="center">
          <Typography style={{fontWeight:900,width:"100%"}}  align={matchesMD?undefined:"center"}>Username</Typography>
          <TextField style={{width:matchesMD?"100%":"30%"}} onChange = {(e)=>{setUser(e.target.value);}} placeholder='Type your username here' variant='filled'/>
      </Grid>
      <Grid item container style={{marginTop:"1em"}} justifyContent="center">
          <Typography style={{fontWeight:900,width:"100%"}}  align={matchesMD?undefined:"center"}>Password</Typography>
          <TextField style={{width:matchesMD?"100%":"30%"}} onChange = {(e)=>{setPassword(e.target.value);}} placeholder='Type your password here' variant='filled'/>
      </Grid>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        open={open}
        onClose={handleClose}
        message="Wrong Password"
        style={{marginBottom:"4em"}}
      />
      <Button onClick={()=>{handleLogin()}} variant="contained" style={{width:"30%",marginBottom:"2em",backgroundColor:"#F2C94C",marginTop:"3em"}}>Login</Button>
    </Grid>
  );
}

export default Login;