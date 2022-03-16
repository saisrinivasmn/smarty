import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth,fs } from '../Config/Config';
import { createUserWithEmailAndPassword, } from "firebase/auth"
import { collection,setDoc,doc} from 'firebase/firestore';
export const Signup = () => {

    const navigate = useNavigate();
    const [fullname, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [sucessMsg, setsucessMsg] = useState('');
    
    const handleSignup = (e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password).then(async (credentials)=>{
            const users = collection(fs, "users");
            await setDoc(doc(users, credentials.user.uid), {
                Fullname: fullname,
                Email: email,
                Password: password
            }).then(()=>{
                setsucessMsg('Signup Successfull. You will now automatically redirected to login');
                setfullName('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setsucessMsg('');
                    navigate('/Login');
                },3000)
            })
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }
  return (
    <div className='container'>
    <br></br>
    <br></br>
    <h2>Sign up</h2>
    <hr></hr>
    {sucessMsg&&<>
    <div className='success-msg'>{sucessMsg}</div>
    <br></br>
    </>}
    <form autoComplete="off" className='form-group' onSubmit={handleSignup}>
        <label >Full Name</label>
        <input type="text" className='form-control' required
            onChange={(e) => setfullName(e.target.value)} value={fullname} />
        <br></br>
        <label >Email</label>
        <input type="email" className='form-control' required
            onChange={(e) => setEmail(e.target.value)} value={email} />
        <br></br>
        <label >Password</label>
        <input type="password" className='form-control' required
            onChange={(e) => setPassword(e.target.value)} value={password} />
        <br></br>
        <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
    </form>
    {errorMsg&&<>
    <br></br>
    <div className='error-msg'>{errorMsg}</div>
    </>}
    <br />
    <span>Already have an account? Login
        <Link to="/Login"> Here</Link>
    </span>
</div>
  )
}
