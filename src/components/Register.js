import {Grid,useMediaQuery,Button,Typography,TextField} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {ArrowBackIos} from '@mui/icons-material';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function Register() {
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate();
  const [name,setName] = useState("")
  const [user,setUser] = useState("")
  const [password,setPassword] = useState("")

  const handleRegister = async () => {
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
    console.log(responseData)
    navigate('/login')
  }

  return (
    <Grid container style={{height:"100vh"}} direction = {matchesMD?"column":"row"}>
      <Grid onClick={()=>navigate('/')} item style={{marginTop:"1em",marginBottom:"1em"}}>
        <ArrowBackIos />
      </Grid>
      <Grid container item>
        <Typography style={{width:"100%",fontWeight:900}}>Create account</Typography>
        <Typography style={{width:"100%",fontWeight:900,fontSize:"2em"}}>Let's get to know you better</Typography>
      </Grid>
      <Grid item container style={{marginTop:"2em"}}>
          <Typography style={{fontWeight:900}}>Your name</Typography>
          <TextField style={{width:"100%"}} onChange = {(e)=>{setName(e.target.value);}} placeholder='Type your name here' variant='filled'/>
      </Grid>
      <Grid item container style={{marginTop:"1em"}}>
          <Typography style={{fontWeight:900}}>Username</Typography>
          <TextField style={{width:"100%"}} onChange = {(e)=>{setUser(e.target.value)}} placeholder='Type your username here' variant='filled'/>
      </Grid>
      <Grid item container style={{marginTop:"1em"}}>
          <Typography style={{fontWeight:900}}>Password</Typography>
          <TextField style={{width:"100%"}} onChange = {(e)=>{setPassword(e.target.value)}} placeholder='Type your password here' variant='filled'/>
      </Grid>
      <Grid item container style={{marginTop:"auto"}}>
        <Button variant="contained" onClick={()=>{handleRegister()}} style={{width:"100%"}}>Register</Button>
      </Grid>
    </Grid>
  );
}

export default Register;