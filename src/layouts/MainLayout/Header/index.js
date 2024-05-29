import { Box, Typography } from '@mui/material'
import React from 'react'
import NavItem from '../NavItem/NavItem'
import ProfileSection from '../ProfileSection/ProfileSection'

const Header = () => {
  return (
    <Box
        sx={{
            backgroundColor : '#4AB37E',
            height : '80px',
            boxShadow: '0px 4px 7.5px 0px #00000021',
            px : {xs : 1 , md : 4},
            display : 'flex',
            justifyContent : 'space-between',
            alignItems : 'center',
            color : 'white'
        }}
    >
        <Typography
            sx={{
                fontSize: '20px',
                fontWeight : '600',
                
            }}
        >
            Support Dashboard
        </Typography>

        <NavItem />
        <ProfileSection />
    </Box>
  )
}

export default Header