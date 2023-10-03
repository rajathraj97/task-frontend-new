import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { TaskContext } from './App';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Home =() =>{
  const[taskData,setTaskData] = React.useState({title:"",body:""})
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const UpdateTasks = React.useContext(TaskContext).UpdateTasks
  const tasks = React.useContext(TaskContext).tasks
  const token =React.useContext(TaskContext).token

  const handleChange = (e) =>{
    setTaskData({...taskData,[e.target.name]:e.target.value})
  }
  
  const handleUpdate = (id,token) =>{
    
    axios.patch(`https://task-backend-yy4g.onrender.com/api/updatetask/${id}`,{},{headers:{'authorization':token}})
    .then((res)=>{
        console.log(res)
        axios.get(`https://task-backend-yy4g.onrender.com/api/gettasks/${res.data.user}`,{headers:{"authorization":localStorage.getItem('token')}})
        .then((res)=>{
            UpdateTasks(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
       
    })
    .catch((err)=>{
        console.log(err)
    })
  }

 const handleDelete = (id,token) =>{
    axios.delete(`https://task-backend-yy4g.onrender.com/api/deletetask/${id}`,{headers:{'Authorization':token}})
    .then((res)=>{
        console.log(res)
        axios.get(`https://task-backend-yy4g.onrender.com/api/gettasks/${res.data.user}`,{headers:{"Authorization":localStorage.getItem('token')}})
        .then((res)=>{
            UpdateTasks(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
       
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const handleAddTask = (taskData) =>{
    console.log('in task')
    const id = jwtDecode(localStorage.getItem('token'))
    axios.post("https://task-backend-yy4g.onrender.com/api/createtask",{...taskData,user:id._id},{headers:{'Authorization':localStorage.getItem('token')}})
    .then((res)=>{
        console.log(res)
        axios.get(`https://task-backend-yy4g.onrender.com/api/gettasks/${id._id}`,{headers:{"Authorization":localStorage.getItem('token')}})
        .then((res)=>{
            UpdateTasks(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
        handleClose(true)
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  React.useEffect(()=>{
    const id = jwtDecode(localStorage.getItem("token"))
    console.log(id)
    axios.get(`https://task-backend-yy4g.onrender.com/api/gettasks/${id._id}`,{headers:{"authorization":localStorage.getItem('token')}})
    .then((res)=>{
        UpdateTasks(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })
   
  },[])

  return (
    <div style={{margin:"10px"}}>
      <Button sx={{marginLeft:"-55px"}} variant="contained"onClick={handleOpen}>Add Task</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <TextField
          required
          id="outlined-required"
          label="Title"
          
          value={taskData.titile}
          onChange={(e)=>{handleChange(e)}}
          name="title"
          size="small"
        />
        <br/><br/>
         <TextField
          id="outlined-multiline-static"
          label="Body"
          multiline
          rows={4}
          value={taskData.body}
          onChange={(e)=>{handleChange(e)}}
          name="body"

        /><br/><br/>
        <Button variant='contained' onClick={()=>{handleAddTask(taskData)}}>Submit</Button>

        </Box>
      </Modal>
        <hr/>
      <div style={{marginLeft:"-55px"}}>
        <Typography variant='h3'>MY TASKS</Typography><br/>
        <Typography variant='h5'>Total-Tasks : {tasks.length}</Typography>
            {tasks.map((tsk,i)=>{
                return <div key={i}>
                    <h4>Title: {tsk.title}</h4>
                    <h4>Body: {tsk.body}</h4>
                    {tsk.completed === "true" ? <h4 style={{color:"green"}}>Completed: {tsk.completed}</h4> : <h4 style={{color:"red"}}>Completed: {tsk.completed}</h4>}
                    <Button variant='contained' size='small' onClick={()=>{handleUpdate(tsk._id,token)}}>Mark As Completed</Button><br/><br/>
                    <Button variant='contained' color='error' onClick={()=>{handleDelete(tsk._id,token)}} size='small'>Delete</Button>
                    <hr/>
                </div>
            })}
      </div>
    </div>
  );
}

export default Home