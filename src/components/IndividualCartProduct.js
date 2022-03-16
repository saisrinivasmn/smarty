import React,{useState} from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import { auth,fs } from '../Config/Config'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, deleteDoc,collection } from "firebase/firestore";


export const IndividualCartProduct = ({cartProduct,cartProductIncrease,cartProductDecrease}) => {
    
    const [cartItem, setCartItem]=useState(cartProduct);
    
    const [selectedQuantity,setSelectedQuantity] = useState(cartItem.qty);
    const [totalPrice,settotalPrice] = useState(cartItem.TotalProductPrice);
    
    
    const handleDelete = ()=>{
        onAuthStateChanged(auth,async user=>{
            if(user){

                await deleteDoc(doc(fs,'Cart ' + user.uid,cartItem.ID )).then(()=>{
                    console.log('successfully deleted');
                
                });
                
                setCartItem(cartProduct)
                console.log(cartProduct);
                
            }})
            
        }
    
    

    const handlecartProductIncrease = ()=>{
        cartProductIncrease(cartProduct);
        setSelectedQuantity(cartProduct.qty);
        settotalPrice(cartProduct.TotalProductPrice);
    }
    const handlecartProductDecrease = ()=>{
        cartProductDecrease(cartProduct);
        setSelectedQuantity(cartProduct.qty);
        settotalPrice(cartProduct.TotalProductPrice);
    }
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={cartItem.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{cartItem.productName}</div>
            <div className='product-text price'>$ {cartItem.price}</div>
            <span>Quantity</span>
            <div className='product-text quantity-box'>
                <div className='action-btns minus' onClick={handlecartProductDecrease} >
                    <Icon icon={minus} size={20}/>
                </div>                
                <div>{selectedQuantity}</div>               
                <div className='action-btns plus' onClick={handlecartProductIncrease}>
                    <Icon icon={plus} size={20}/>
                </div>
            </div>
            <div className='product-text cart-price'>$ {totalPrice}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleDelete}  >DELETE</div>            
        </div>
    )
}