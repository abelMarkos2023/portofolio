import React from 'react'
import {Box,Typography} from '@mui/material'
import Img from '../assets/fullstack.png'
import {projectsStore} from '../Store/ProjectsStore'
const FullstackComp = () => {

    const {projects} = projectsStore()

    return (
        <Box>
            <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <img src={Img} width="80"/>
                <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                <Typography sx={{fontSize:"20px",fontWeight:"bold"}}>Fullstack Projects</Typography>
                <Typography sx={{fontSize:"44px"}}>{projects.filter(p => p.type === 'full-stack').length}</Typography>
                </Box>
            </Box>
        </Box>
    )

}

export default FullstackComp;