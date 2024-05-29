import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import useGetTemplateByNumber from '../../../api/useGetTemplateByNumber'

const CheckTemplate = () => {
    const  [template , setTemplate] = useState("")
    const check = useGetTemplateByNumber()
    
  return (
    <Box
        sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            flexDirection : 'column',
            gap : '20px'
        }}
    >
        <FormControl color='success'>
            <InputLabel>Template Number</InputLabel>
            <OutlinedInput 
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                label="Template Number"
            />
        </FormControl>
        <LoadingButton
            color='success'
            variant='outlined'
            loading={check.isLoading}
            disabled={!template}
            onClick={() => {
                check.callMutation(template)
            }}
        >
            Check
        </LoadingButton>
        {
            !check.mutate.isPending && !check.mutate.isError && check.mutate?.data?.data && <Box
                sx={{
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'center',
                    mt : 4
                }}
            >
                    <img 
                        src={check.mutate?.data?.data?.template}
                        alt='template'
                        style={{
                            maxWidth : '700px'
                        }}
                    />
                </Box>
        }
    </Box>
  )
}

export default CheckTemplate