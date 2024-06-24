import { Image } from '@mui/icons-material'
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import React, { useRef,useState } from 'react'
import readImgString from '../Hooks/readImgString'
import useAddProject from '../Hooks/useAddProject'

const Form = ({setOpen,setAdding}) => {
    const imgRef = useRef(null)
    const {imgString,readData} = readImgString()
    const {insertData,loading} = useAddProject()
    const [data,setData] = useState({
        title:"",
        stack:"",
        demoLink:"",
        githubLink:"",
        desc:"", 
        tech:[],
        type:""
    })

    console.log(data)

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

        setAdding(true)

        try {
            await insertData(data,imgString)
            setOpen(false)
            setAdding(false)
        } catch (error) {
            console.log(error)
            setAdding(false)
        }
    }
  return (
    <Paper>
        {loading ? (<Box sx={{display:"flex",justifyContent:"center",alignItems:"center" ,p:4}}>
            <CircularProgress size={'140px'} sx={{alignSelf:"center"}} thickness={6}/>
        </Box>) : ( <Stack>
        <Box sx={{display:'flex',gap:"0.6rem",p:"8px"}}>
        <TextField id="outlined-basic" label="Title" onChange={e => setData({...data,title:e.target.value})} variant="outlined" />
        <TextField id="outlined-basic" label="Stack" variant="outlined" onChange={e => setData({...data,stack:e.target.value})} />
        </Box>
        <Box sx={{p:'8px'}}>
        <TextField id="outlined-basic" sx={{width:"100%"}} label="Demo Link" variant="outlined" onChange={e => setData({...data,demoLink:e.target.value})} />

        </Box>

        <Box sx={{p:'8px'}}>
        <TextField id="outlined-basic" sx={{width:"100%"}} label="Github  Link" variant="outlined" onChange={e => setData({...data,githubLink:e.target.value})}/>

        </Box>
        <Box sx={{p:'8px'}}>
        <TextField id="outlined-basic" sx={{width:"100%"}} label="Description" variant="outlined" onChange={e => setData({...data,desc:e.target.value})} />

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
            
            <FormControlLabel name="tech[]" onChange={handleChecks} value="react.js" control={<Checkbox />} label="React.js" />
            <FormControlLabel name="tech[]" onChange={handleChecks} value="node.js" control={<Checkbox />} label="Node.js" />
            <FormControlLabel name="tech[]" onChange={handleChecks} value="laravel" control={<Checkbox />} label="Laravel" />
            <FormControlLabel name="tech[]" onChange={handleChecks} value="php" control={<Checkbox />} label="PHP" />
            <FormControlLabel name="tech[]" onChange={handleChecks} value="wordpress" control={<Checkbox />} label="Word Press" />
            <FormControlLabel name="tech[]" onChange={handleChecks} value="vue.js" control={<Checkbox />} label="Vue.js" />

       </FormGroup>
      </Box>
     <Box sx={{py:4}}>
        <Button variant='contained' onClick={handleSubmit}>Add Project</Button>
     </Box>
     </Stack>)}
    </Paper>
  )
}

export default Form