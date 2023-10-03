import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2'
import axios from "axios"
import jwt_decode from "jwt-decode";
import { TaskContext } from './App';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = ()=> {
const[loginData,setLoginData] = React.useState({email:"",password:""})
const navigate = useNavigate()
const UpdateTasks = React.useContext(TaskContext).UpdateTasks
const UpdateToken = React.useContext(TaskContext).UpdateToken



  const handleSubmit = (e,loginData) => {
    e.preventDefault();
    if(!(loginData.email.includes('@')) || loginData.password.lenngth < 1 || !(loginData.email.includes('.com'))){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong in email or password',
            
          })
    }else{
        axios.post("https://task-backend-yy4g.onrender.com/api/login",loginData)
    .then((res)=>{
        if(res.data.hasOwnProperty('error')){
            Swal.fire('User details not found')
        }else{
            localStorage.setItem('token',res.data)
            UpdateToken(res.data)
            const id =jwt_decode(res.data)
            axios.get(`https://task-backend-yy4g.onrender.com/api/gettasks/${id._id}`,{headers:{Authorization:res.data}})
            .then((res)=>{
                UpdateTasks(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })

            navigate("/home")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
    }
    
   
  };

  const handelChange = (e) =>{
    setLoginData({...loginData,[e.target.name]:e.target.value})

  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={loginData.email}
              onChange={(e)=>{handelChange(e)}}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={loginData.password}
              onChange={(e)=>{handelChange(e)}}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e)=>{handleSubmit(e,loginData)}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login