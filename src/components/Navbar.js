import React from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import { auth } from '../Config/Config'
import { signOut } from 'firebase/auth'


export const Navbar = ({user,totalProducts}) => {

  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      
    });
  }

  return (
    
        <div className='navbox'>
            <div className='leftside'>
                <div className='logo'>
                  <img src={require('../Images/logo.jpg')} alt="logo" />
                </div>
            </div>
            <div className='rightside'>
              {!user && <>
                <div><Link to="/signup" className='navlink'>SIGN UP</Link></div>
                <div><Link to="/login" className='navlink'>LOGIN</Link></div>
              </>
              }
            
              {user && <>
                <div><Link to="/" className='navlink'>{user}</Link></div>
                <div className='cart-menu-btn'>
                  <Link to="/cart" className='navlink'>
                    <Icon icon = {shoppingCart} size = {20}/>
                  </Link>
                  <span className='cart-indicator'>{totalProducts}</span>
                </div>
                <div className='btn btn-danger btn-md'onClick={handleLogout}>
                  LOGOUT
                </div>
              </>
              }
            </div>
        </div>
    
  )
}
