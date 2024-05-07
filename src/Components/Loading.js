import { Box, CircularProgress } from '@mui/material'
import React from 'react'

function Loading() {
  return (
    <div
          style={{
            width: '100vw',
            height: '100vh',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <CircularProgress />
          </Box>
        </div>
  )
}

export default Loading