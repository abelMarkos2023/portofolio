import React, { useEffect, useState } from 'react'
import './Login.scss'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    const [inputs,setInputs] = useState({email:"",password:""});
    const [error,setError] = useState('')

    const authUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if(authUser){
            navigate('/dashboard')
        }
    })
    const handleClick = async () => {
        if(inputs.email !== '' || inputs.password !== ''){
            try {
                const {user} = await signInWithEmailAndPassword(Auth,inputs.email,inputs.password)

                localStorage.setItem('user',JSON.stringify(user))

                navigate('/dashboard')
            } catch (error) {
                setError(error.message)
            }
        }else{
            setError('Please Fill out all the fields')
        }
    }
  return (
    <div className="login">
        <div className="form">
            <div className="bluecircule"></div>
            <div className="orngecircule"></div>
            <h1>Login</h1>
            <div className="inputs">
                {error && <span>{error}</span>}
                <input onChange={e => setInputs({...inputs,email:e.target.value})} type="email" placeholder="Email" />
                <input onChange={e => setInputs({...inputs,password:e.target.value})} type="password" placeholder="Password" />
                <button className="submit" onClick={handleClick}>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Login