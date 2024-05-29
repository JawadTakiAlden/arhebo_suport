import { Box } from '@mui/material'
import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import CustomBreadcrumbs from './CustomBreadcrumbs'

const MainLayout = () => {
  return (
    <Box>
        <Header />
        
        <Box
            sx={{
                px : 4,
                py : 2
            }}
        >
            {/* <CustomBreadcrumbs /> */}
            <Outlet />
        </Box>
    </Box>
  )
}

export default MainLayout