
import { Box, Button, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGetMenuItem } from '../../../menu-items'

const NavItem = () => {
    const location = useLocation()
    const menuItem = useGetMenuItem()
  return (
    <Box
        sx={{
            display : 'flex',
            alignItems : 'center',
        }}
    >
        {
            menuItem.map((item , i)=> {
                return<Typography  sx={{textTransform : 'capitalize',
                textDecoration : 'none',
                color : 'white',
                transition : '0.3s', 
                fontSize : '20px',
                mr : 2,
                "&:hover" : {
                    mt : 1 ,
                }
                }} key={i} component={Button} startIcon={item.icon}>
                    <Link className={`header-link ${location.pathname === item.path ? 'active' : ''}`} to={item.path} >{item.title}</Link>
                </Typography>
            })
        }
    </Box>
  )
}

export default NavItem