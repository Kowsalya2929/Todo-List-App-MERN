import React, { useEffect, useState } from 'react'
import { Box, Button, Container, List, ListItem, ListItemButton, ListItemText, Modal, TextField, Typography } from '@mui/material'
import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import Done from '@mui/icons-material/Done'
import { useTodoStore } from '../store/todo'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const HomePage = ({theme}) => {

  const [newTodo,setNewTodo]= useState({text:"",completed:false})
  const [editTodo,setEditTodo] = useState(null)
  const {createTodo,getAllTodos,todos,deleteTodo,updateTodo} = useTodoStore()
  const handleAddTodo = async()=>{
    const {success,message} = await createTodo(newTodo)
    if(!success){
      toast.error(message || "Something Went Wrong",{
        position: 'top-center',
        pauseOnHover: true,
        autoClose: 3000,
        hideProgressBar: false,
        draggable: true,
        closeOnClick: true
      })
    }else{
      toast.success(message||"Todo created Successfully",{
        position: 'top-center',
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        autoClose: 3000,
        pauseOnHover: true
      })
      setNewTodo({text:"",completed: false})
    }
  }

  useEffect(()=>{
    getAllTodos()
  },[getAllTodos])

  const [open,setOpen] = useState(false)

  const handleOpen=(todo)=>{
    if(!todo) return;
    setEditTodo(todo)
    setOpen(true)
  }
  const handleClose =()=>{
    setOpen(false)
  }

  const handleDelete=async(tid)=>{
    const {success,message} = await deleteTodo(tid)
    if(!success){
      toast.error(message,{
        position: 'top-center',
        pauseOnHover: true,
        autoClose: 3000,
        hideProgressBar: false,
        draggable: true,
        closeOnClick: true
      })
    }else{
      toast.success(message,{
        position: 'top-center',
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        autoClose: 3000,
        pauseOnHover: true
      })
    }
  }

  const handleUpdateTodo=async(tid,editTodo)=>{
    const {success,message} = await updateTodo(tid,editTodo)
    handleClose()
    if(!success){
      toast.error(message||"Update failed!",{
        position: 'top-center',
        pauseOnHover: true,
        autoClose: 3000,
        hideProgressBar: false,
        draggable: true,
        closeOnClick: true
      })
    }else{
      toast.success(message,{
        position: 'top-center',
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        autoClose: 3000,
        pauseOnHover: true
      })
    }
  }

  const handleToggle = async (tid, completed) => {
    const { success, message } = await updateTodo(tid, { completed: !completed });
    if(!success){
      toast.error(message|| "Toggle failed!",{
        position: 'top-center',
        pauseOnHover: true,
        autoClose: 3000,
        hideProgressBar: false,
        draggable: true,
        closeOnClick: true
      })
    }else{
      toast.success(message||"Status updated",{
        position: 'top-center',
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        autoClose: 3000,
        pauseOnHover: true
      })
    }
  };
  

  
  return (
    <Container maxWidth='xs'>
      <ToastContainer />
      <Typography variant='h6' textAlign='center' sx={{fontSize:{md:'1.7rem',xs:'1.5rem'},fontWeight:'bold',my:3}}>
        Create TodoList
      </Typography>
      <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <TextField 
        label="Text"
        name='text'
        fullWidth
        value={newTodo.text}
        onChange={(e)=>setNewTodo({...newTodo,text: e.target.value})}
      />
      <Button variant='contained' size='medium' sx={{ml:2,p:2,textTransform:'capitalize'}} onClick={handleAddTodo}>
        Add
      </Button>
      </Box>

      {todos.length === 0 && (
        <Typography variant='body1' textAlign='left' sx={{my:5,fontSize:'1rem'}}>
        📝 Text Not Found, Make Todos
        </Typography>
      )}

      <List>
        {todos.map((t)=>(
          <ListItem key={t._id} sx={{alignItems:'center'}}>
          <ListItemText primary={t.text} sx={{textDecoration:t.completed ? 'line-through': 'none',color: t.completed? 'gray': 'inherit',whiteSpace:'normal',overflowWrap:'break-word',flex:1,wordBreak:'break-word',}} />
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <ListItemButton onClick={()=>handleToggle(t._id,t.completed)} sx={{backgroundColor: "#38b000",color:theme==='light'? 'black':'white',"&:hover":{backgroundColor:'#007200'},mr:1,p:1,borderRadius:2}}>
            <Done />
          </ListItemButton>
          <ListItemButton onClick={()=>handleOpen(t)} sx={{backgroundColor: "#1fbdd3",color:theme==='light'? 'black':'white',"&:hover":{backgroundColor:'#1a98a6'},mr:1,p:1,borderRadius:2}}>
            <Edit />
          </ListItemButton>
          <ListItemButton onClick={()=>handleDelete(t._id)} sx={{backgroundColor: "#f94449",color:theme==='light'? 'black':'white',"&:hover":{backgroundColor:'#c30010'},p:1,borderRadius:2}}>
            <Delete />
          </ListItemButton>
          </Box>
          </ListItem>
        ))}
      </List>
      {open && editTodo && (
      <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position:'absolute',
          top:'30%',
          left:{md:'39%',xs:'10%'},
          bgcolor: 'background.paper',
          p:{md:3,xs:1},
          width:{md:300,xs:250},
          borderRadius:2
        }}
      >
        <Typography variant='h6' textAlign='center' sx={{fontSize:{md:'1.7rem',xs:'1.5rem'},color:theme==='light'? 'black':'white',fontWeight:'bold',my:3}}>
          Update TodoList
        </Typography>
        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
          <TextField 
            label="Text"
            name='text'
            fullWidth
            value={editTodo?.text || ""}
            onChange={(e)=>setEditTodo({...editTodo,text: e.target.value})}
          />
          <Box sx={{my:3}}>
            <Button onClick={()=>handleUpdateTodo(editTodo._id,editTodo)} variant='contained' sx={{ml:2,textTransform:'capitalize'}}>
              Update
            </Button>
            <Button onClick={handleClose} variant='text' size='medium' sx={{ml:2,textTransform:'capitalize'}}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
      </Modal>
      )}
    </Container>
  )
}

export default HomePage