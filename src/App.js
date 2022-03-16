import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Notfound } from './components/Notfound';
import { Signup } from './components/Signup';
import { Machine1 } from './components/Machine1';
import { Cart } from './components/Cart';
import { Qr } from './components/Qr';
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route exact path='/' element={<Home/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Machine1' element={<Machine1/>} />
        <Route path='/Cart' element={<Cart/>} />  
        <Route path='/Qr' element={<Qr/>} />  
        <Route  element={<Notfound/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
