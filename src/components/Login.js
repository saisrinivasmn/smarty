import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Config/Config';
import { signInWithEmailAndPassword } from "firebase/auth"

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [sucessMsg, setsucessMsg] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth,email, password).then(() => {
            setsucessMsg('Login Successfull. You will now automatically redirected to Home page');
            setEmail('');
            setPassword('');
            setErrorMsg('');
                setTimeout(()=>{
                    setsucessMsg('');
                    navigate('/');
                },3000)
        }).catch((error) => setErrorMsg(error.message));
    }
    return (
        <div className='container'>
            <br></br>
            <h1>Login</h1>
            <hr></hr>
            {sucessMsg&&<>
                <div className='success-msg'>{sucessMsg}</div>
                <br></br>
            </>}
            <form autoComplete="off" className='form-group' onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br></br>
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <br></br>
                <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
            </form>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>
            </>}
            <br></br>
            <span>Don't have an account? Register
                <Link to="/Signup"> Here</Link>
            </span>
        </div>
  )
}
