import { useEffect, useState } from 'react'
import  './Dashboard.scss'
import { CloseOutlined, MenuOpenOutlined } from '@mui/icons-material'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Form from '../../components/Form';
import useAddProject from '../../Hooks/useAddProject';
import DenseTable from '../../components/Table';
import FrontEndComp from '../../components/FrontendComp'
import BackendComp from '../../components/BackendComp'
import FullstackComp from '../../components/FullstackComp'
import BasicPie from '../../components/PiChart'
import BasicBars from '../../components/BarChart'
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

import Logo from '../../assets/fullstack2.jfif'

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [adding,setAdding] = useState(false)
    const navigate = useNavigate()

      const user = JSON.parse(localStorage.getItem('user')) || '';

      useEffect(() => {
        if (!user){
          navigate('/login')
        }
      })
    const logout = () => {
      localStorage.removeItem('user')
      navigate('/login')
    }

    const [menu,setMenu] = useState(false)
  return (
    <>
    <div className="gridContainer">
        <nav className="navbar">
            <img src={Logo} alt="" className="logo" />

           <div className="leftSide">
           <Button onClick={handleOpen} variant="contained">Add New Project</Button>
           <button className="logout" onClick={logout}>Logout</button>
           </div>
        </nav>
        <main className="content">
            <div className="card">
              <FrontEndComp />
              
            </div>
            <div className="card">
            <BackendComp />
            </div>
            <div className="card">
              <FullstackComp />
            </div>
            <div className="card"></div>
            <div className="card">
            <BasicPie />
            </div>
            <div className="card">
              <BasicBars />
            </div>
            <article className="table">
            <DenseTable />
        </article>
        </main>
        
    </div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {adding ? "Adding New Project...." : "Add New Project"}
          </Typography>
        <Form setAdding={setAdding} setOpen = {setOpen}/>
        </Box>
      </Modal>
      </>
  )
}

export default Dashboard





