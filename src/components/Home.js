import React,{useState,useEffect} from 'react'
import { Navbar } from './Navbar'
import { Nearme } from './Nearme'
import { auth,fs } from '../Config/Config';
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";
import { useNavigate,Link } from 'react-router-dom';
import Icon from '@mdi/react'
import { mdiQrcodeScan } from '@mdi/js';


export const Home = () => {
  const navigate = useNavigate();
  function Getcurrentuser(){
    const [user,setUser] = useState(null);
    useEffect(()=>{
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          
          const docRef = doc(fs, "users",user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser(docSnap.data().Fullname);
          }
          
        } else 
        {
          setUser(null);
        }
      })
    },[])
    return user;
  }
  const user = Getcurrentuser();
  


const routeChange = () =>{  
  navigate('/Machine1');
}
  return (
    <>
        home
        <Navbar user={user}/>
        <Nearme/>
        <Link to="/Qr">
                    <button >
                        <Icon 
                        style={{padding:10}}
                        path={mdiQrcodeScan}
                        title="QR Scanner"
                        size={10}
                        color="white"
                        />
                    </button>
                    </Link>
    </>
  )
}
