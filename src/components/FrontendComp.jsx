import React from 'react'
import {Box,Typography} from '@mui/material'
import Img from '../assets/frontend.png'
import {projectsStore} from '../Store/ProjectsStore'
const FrontEndComp = () => {

    const {projects} = projectsStore()

    return (
        <Box>
            <Box sx={{display:"flex",gap:2,alignItems:"flex-start",justifyContent:"space-between"}}>
                <img src={Img} width="60"/>
                <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                <Typography sx={{fontSize:"20px",fontWeight:"bold"}}>Front-end Projects</Typography>
                <Typography sx={{fontSize:"44px"}}>{projects.filter(p => p.type === 'front-end').length}</Typography>
                </Box>
            </Box>
        </Box>
    )

}

export default FrontEndComp;