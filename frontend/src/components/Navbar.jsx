import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import LightMode from '@mui/icons-material/LightMode'
import DarkMode from '@mui/icons-material/DarkMode'

const Navbar = ({theme,setTheme}) => {
  return (
    <AppBar position='sticky'>
      <Toolbar sx={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
        <Typography variant='h6' sx={{fontSize: {md: '1.8rem',xs:'1.5rem'}}}>
          TodoList App
        </Typography>
        <IconButton sx={{borderRadius:'50%',backgroundColor: theme === 'light'?'rgb(35, 103, 176)':"#444",color: theme === 'light' ? 'orange' :'white'}} onClick={()=>setTheme(theme === 'light' ? 'dark':'light')}>
          {theme === 'light' ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;