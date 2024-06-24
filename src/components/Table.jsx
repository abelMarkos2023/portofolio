import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useGetprojects from '../Hooks/useGetprojects';
import { Box, Button, CircularProgress } from '@mui/material';
import { projectsStore } from '../Store/ProjectsStore';
import { Delete, Edit } from '@mui/icons-material';
import useDeleteProject from '../Hooks/useDeleteProject';
import Modal from './Modal';
import ModalComp from './Modal';

export default function DenseTable() {

    const {loading,projects,getProjects} = useGetprojects()
    const {projects:pros,setUpdateProData} = projectsStore();
    const {loading:load,deleteProject} = useDeleteProject()
    const [open,setOpen] = React.useState(false)

  return loading ? (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <CircularProgress size={'120px'} thickness={4} />
    </Box>
  ) : (
    <TableContainer component={Paper} sx={{height:"100%",width:"100%"}}>
     
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align="right">#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">Stack</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Github Link</TableCell>
            <TableCell align="right">Demo Link</TableCell>
            <TableCell align="right">Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {pros.map((row,index) => (
            <TableRow
              key={row.githubLink}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.stack}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">
                <a target='_blanck' href={row.githubLink}>Github</a>
              </TableCell>
              <TableCell align="right">
                <a target='_blanck' href={row.demoLink}>Demo</a>
              </TableCell>
             
            <TableCell align="right" sx={{display:"flex",gap:1}}>
              <Button size='small' variant="contained" sx={{fontSize:"12px"}} color="success" startIcon={<Edit />} onClick={() => {
                setOpen(!open)
                setUpdateProData(row)
                console.log(row)
              }}>
                
                Edit
              </Button>
              <Button sixe="small" sx={{fontSize:"12px"}} variant="outlined" color="error" startIcon={<Delete />} loading={load} onClick = {() => deleteProject(row)}>
                Delete
              </Button>
            </TableCell>

            
            </TableRow>
          ))}
          <ModalComp openModal = {open} close={setOpen}/>
        </TableBody>
      </Table>
    </TableContainer>
  );
}