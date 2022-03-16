import React,{ useState } from 'react'

export const IndividualProduct = ({individualProduct, addToCart}) => {
    
    const [isDisabled, setIsDisabled] = useState(false);

    const handleAddToCart=()=>{
        addToCart(individualProduct);
    } 

    if(individualProduct.quantity === 0){
        setIsDisabled(true);
    }
    
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={individualProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualProduct.productName}</div>
            <div className='product-text description'>{individualProduct.quantity}</div>
            <div className='product-text price'>$ {individualProduct.price}</div>
            <div className='btn btn-danger btn-md cart-btn' disabled={isDisabled} onClick= {handleAddToCart} >ADD TO CART</div>
        </div> 
    )
}