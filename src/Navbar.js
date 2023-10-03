import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link,Route,Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './Signup';
import Home from './Home';
import Notfound from './Notfound';


const Navbar = () => {
    const navigate = useNavigate()
    
    
    
    const handelLogout = () =>{
        localStorage.removeItem('token')
        navigate("/home")
    }

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TASK-MANAGER
          </Typography>
          {localStorage.getItem('token') ? <Button color="inherit" onClick={()=>{handelLogout()}}>LogOut</Button> : <Link to="/login" style={{textDecoration:"none",color:"white"}}><Button color="inherit">Login</Button></Link>}
        </Toolbar>
      </AppBar>
    </Box>

    <Routes>
        <Route path="/" element={localStorage.getItem('token') ?<Home/>:<Login />}/>
        <Route path="/home" element={localStorage.getItem('token') ?<Home/>:<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </div>
  );
}

export default Navbar