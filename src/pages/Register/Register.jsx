import React, { useState } from 'react'
import './Register.scss'
import { SpaRounded } from '@mui/icons-material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '../../Firebase/Firebase';
const Register = () => {

    const [inputs,setInputs] = useState({email:"",password:"",cpassword:""});
    const [error,setError] = useState('')

    const handleSubmit = async() => {
        console.log(inputs)

        if(inputs.email !== '' && !inputs.password == ''){

            if(inputs.password === inputs.cpassword){

                try {
                    const {user} = await createUserWithEmailAndPassword(Auth,inputs.email,inputs.password);

                    localStorage.setItem('user',JSON.stringify(user))
                } catch (error) {
                    setError(error.message)
                }
            }
            else{
                setError('password mis match')
            }
        }else{
            setError('please fill out all the field')
        }
    }

  return (
    <div className="register">
        <div className="form">
            <div className="bluecircule"></div>
            <div className="orngecircule"></div>
            <h1>Register</h1>
            <div className="inputs">
                {error && <span>{error}</span>}
                <input name="email" type="email" onChange={e => setInputs({...inputs,[e.target.name]:e.target.value})} placeholder="Email" />
                <input name="password" type="password" onChange={e => setInputs({...inputs,[e.target.name]:e.target.value})} placeholder="Password" />
                <input name="cpassword" type="password" onChange={e => setInputs({...inputs,[e.target.name]:e.target.value})} placeholder="Confirm Password" />
                <button className="submit" onClick={handleSubmit}>Register</button>
            </div>
        </div>
    </div>
  )
}

export default Register