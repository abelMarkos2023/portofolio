import { Checkbox, CircularProgress, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, TextField } from '@mui/material'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import readImgString from '../Hooks/readImgString';
import { Image } from '@mui/icons-material';
import useUpdateDoc from '../Hooks/useUpdateDoc';
import { projectsStore } from '../Store/ProjectsStore';

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

const  ModalComp = ({openModal,close}) => {
    const {imgString,readData} = readImgString()
    const row = projectsStore(state => state.updateProData)
   const {setUpdateproData} = projectsStore()
    const [data,setData] = React.useState({
        title:row?.title,
        stack:row?.stack,
        demoLink:row?.demoLink,
        githubLink:row?.githubLink,
        desc:row?.desc, 
        tech:row?.tech,
        type:row?.type
    })
    console.log(row)
    const [open, setOpen] = React.useState(openModal);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const imgRef = React.useRef(null)
    const {loading,updatesDoc} = useUpdateDoc()
    const handleChecks = e => {
        if(e.target.checked){
            setData({...data,tech:[...data.tech,e.target.value]})
        }
        else{
            const index = data.tech.indexOf(e.target.value)
            data.tech.splice(index,1)
            setData({...data,tech:data.tech})
        }
    }

    const handleSubmit = async () => {

       console.log(data)

        try {

            await updatesDoc(row.id,data)

            close(!openModal)
       
        } catch (error) {
            console.log(error)
           
        }
    }
const memoPro = React.useMemo(() => row)
    React.useEffect(() => {
        setData(row)
      return () => {
        setData({})
      };
    }, [row])

  return (
   <Paper>
    {loading ? (<Box sx={{display:"flex",justifyContent:"center"}}>
        <CircularProgress size={'120px'} thickness={6}/>
    </Box>) : (
         <Modal
        open={openModal}
        onClose={() => close(!openModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box sx={{display:'flex',gap:"0.6rem",p:"8px"}}>
        <TextField value={data.title} id="outlined-basic" label="Title" onChange={e => setData({...data,title:e.target.value})} variant="outlined" />
        <TextField value={data.stack} id="outlined-basic" label="Stack" variant="outlined" onChange={e => setData({...data,stack:e.target.value})} />
        </Box>
        <Box sx={{p:'8px'}}>
        <TextField value={data.demoLink} id="outlined-basic" sx={{width:"100%"}} label="Demo Link" variant="outlined" onChange={e => setData({...data,demoLink:e.target.value})} />

        </Box>

        <Box sx={{p:'8px'}}>
        <TextField value={data.githubLink} id="outlined-basic" sx={{width:"100%"}} label="Github  Link" variant="outlined" onChange={e => setData({...data,githubLink:e.target.value})}/>

        </Box>
        <Box sx={{p:'8px'}}>
        <TextField value={data.desc} id="outlined-basic" sx={{width:"100%"}} label="Description" variant="outlined" onChange={e => setData({...data,desc:e.target.value})} />

        </Box>

        <Box sx={{display:"flex",justifyContent:"space-between",py:4}}>
            <Button sx={{p:0,border:"none"}} onClick={() => imgRef.current.click()}>
            <Image size="lg"/>
            </Button>
        
        <input type='file' ref={imgRef} style={{display:"none"}} onChange={e => readData(e)} />

        {imgString && <img src={imgString} width={'60px'}/>}
      </Box>


      <Box>
          <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="type"
                value={data.type}
                onChange={e => setData({...data,type:e.target.value})}
                sx={{display:"flex",flexDirection:"row"}}
            >
                <FormControlLabel value="front-end" control={<Radio />} label="Front End" />
                <FormControlLabel value="back-end" control={<Radio />} label="Back End" />
                <FormControlLabel value="full-stack" control={<Radio />} label="Full Stack" />
            </RadioGroup>
        </Box>


        <Box>
        <FormGroup sx={{display:"flex", flexDirection:"row"}}>
            
            <FormControlLabel checked = {data?.tech?.includes('react.js')} name="tech[]" onChange={handleChecks} value="react.js" control={<Checkbox />} label="React.js" />
            <FormControlLabel checked = {data?.tech?.includes('node.js')}  name="tech[]" onChange={handleChecks} value="node.js" control={<Checkbox />} label="Node.js" />
            <FormControlLabel checked = {data?.tech?.includes('laravel')}  name="tech[]" onChange={handleChecks} value="laravel" control={<Checkbox />} label="Laravel" />
            <FormControlLabel checked = {data?.tech?.includes('php')}  name="tech[]" onChange={handleChecks} value="php" control={<Checkbox />} label="PHP" />
            <FormControlLabel checked = {data?.tech?.includes('wordpress')}  name="tech[]" onChange={handleChecks} value="wordpress" control={<Checkbox />} label="Word Press" />
            <FormControlLabel checked = {data?.tech?.includes('vue.js')}  name="tech[]" onChange={handleChecks} value="vue.js" control={<Checkbox />} label="Vue.js" />

       </FormGroup>
      </Box>


      <Box sx={{py:4}}>
        <Button variant='contained' onClick={handleSubmit}>Add Project</Button>
     </Box>


        </Box>
      </Modal>
    )}
   </Paper>
  )
}

export default ModalComp