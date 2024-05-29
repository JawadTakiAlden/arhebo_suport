import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

const CustomBreadcrumbs = () => {
    const location = useLocation()
    const pathWords = location.pathname.split('/')
    const filteredPathWords = pathWords.filter((el) => {
      return !(el === '' || el === 'dashboard')
    })
    let to = '/dashboard/'
    const breadcrumbs = <Breadcrumbs separator={'>'} sx={{
            mb : 2
          }}>
              {
                filteredPathWords.map((word , i) => {
                  to = to + word + '/'
                  return <Typography
                  key={i}
                    sx={{
                      textTransform : 'capitalize',
                      fontSize : '22px',
                      color: '#222222'
                    }}
                  >
                      <Link to={to}>{word.replace('-' , ' ')}</Link>
                    </Typography>
                })
              }
          </Breadcrumbs>

    return breadcrumbs
}

export default CustomBreadcrumbs