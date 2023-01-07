import {Grid,useMediaQuery,Button,Typography,TextField,Snackbar,Backdrop,CircularProgress} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {ArrowBackIos} from '@mui/icons-material';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function Register() {
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate();
  const [name,setName] = useState("")
  const [user,setUser] = useState("")
  const [password,setPassword] = useState("")
  const [openLoading, setOpenLoading] = useState(false);
  const [open,setOpen] = useState(false)

  const handleOpen = () => {
    setOpen({open: true});
  };

  const handleClose = () => {
    setOpen({open: false});
  };

  const handleRegister = async () => {
    setOpenLoading(true)
    const response = await fetch('http://localhost:8000/register',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      }
      ,
      body: JSON.stringify({
        user: user,
        name: name,
        password: password
      })
    })

    const responseData = await response.json();
    setOpenLoading(false)
    if(responseData.message === "exists"){
      handleOpen()
    }
    
    navigate('/login')
  }

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
        <Typography style={{width:"100%",fontWeight:900}} align={matchesMD?undefined:"center"}>Create account</Typography>
        <Typography style={{width:"100%",fontWeight:900,fontSize:"2em"}} align={matchesMD?undefined:"center"}>Let's get to know you better</Typography>
      </Grid>
      <Grid item container justifyContent="center" style={{marginTop:"2em"}}>
          <Typography style={{fontWeight:900,width:"100%"}} align={matchesMD?undefined:"center"}>Your name</Typography>
          <TextField style={{width:matchesMD?"100%":"30%"}} onChange = {(e)=>{setName(e.target.value);}} placeholder='Type your name here' variant='filled'/>
      </Grid>
      <Grid item container justifyContent="center" style={{marginTop:"1em"}}>
          <Typography style={{fontWeight:900,width:"100%"}} align={matchesMD?undefined:"center"}>Username</Typography>
          <TextField style={{width:matchesMD?"100%":"30%"}} onChange = {(e)=>{setUser(e.target.value)}} placeholder='Type your username here' variant='filled'/>
      </Grid>
      <Grid item container justifyContent="center" style={{marginTop:"1em"}}>
          <Typography style={{fontWeight:900,width:"100%"}} align={matchesMD?undefined:"center"}>Password</Typography>
          <TextField style={{width:matchesMD?"100%":"30%"}} onChange = {(e)=>{setPassword(e.target.value)}} placeholder='Type your password here' variant='filled'/>
      </Grid>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        open={open}
        onClose={handleClose}
        message="User Already Exists"
        style={{marginBottom:"4em"}}
      />
      <Grid item container justifyContent="center" style={{marginTop:"auto"}}>
        <Button variant="contained" onClick={()=>{handleRegister()}} style={{width:"30%",marginBottom:"2em",backgroundColor:"#F2C94C",marginTop:"3em"}}>Register</Button>
      </Grid>
    </Grid>
  );
}

export default Register;