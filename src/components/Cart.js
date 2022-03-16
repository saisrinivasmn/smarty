import React,{useState, useEffect} from 'react'
import {Navbar} from './Navbar'
import {auth,fs} from '../Config/Config'
import { CartProducts } from './CartProducts';
import { onAuthStateChanged } from "firebase/auth"
import { collection,doc,getDoc,getDocs,updateDoc,deleteDoc } from 'firebase/firestore';
import StripeCheckout from 'react-stripe-checkout'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const navigate = useNavigate();
    // getting current user function
    function Getcurrentuser(){
        const [user,setUser] = useState();
        
        useEffect(()=>{
          console.log("7891");
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
    console.log(user);
    
    // state of cart products
    const [cartProducts, setCartProducts]=useState([]);
    console.log("789");
    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        onAuthStateChanged(auth,async user=>{
            if(user){
                const querySnapshot = await getDocs(collection(fs, 'Cart ' + user.uid));
                const newCartProduct = querySnapshot.docs.map((doc) => (
                {
                    ID:doc.id,
                    ...doc.data(),
                }));
                
                setCartProducts(newCartProduct);
                console.log(newCartProduct);
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])
    
    
    const qty=cartProducts.map(cartProduct=>{
        return cartProduct.qty
    })
    
    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    const totalQty=qty.reduce(reducerOfQty,0);

    // console.log(totalQty);

    // getting the TotalProductPrice from cartProducts in a seperate array
    const price = cartProducts.map(cartProduct=>{
        return cartProduct.TotalProductPrice;
    } )

    // reducing the price in a single value
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

    var totalPrice = price.reduce(reducerOfPrice,0);

    let Item;
    
    // cart product increase function
    const cartProductIncrease= (cartProduct)=>{
        // console.log(cartProduct);
        Item=cartProduct;
        if(Item.qty+1<=Item.quantity){
            Item.qty = Item.qty+1;
        }
        Item.TotalProductPrice=(Item.qty*Item.price)
        // updating in database
        onAuthStateChanged(auth,async user=>{
            if(user){
                console.log(cartProduct); 
                const cid = 'Cart ' + user.uid
                const cartId = collection(fs, cid);
                await updateDoc(doc(cartId, cartProduct.ID), Item).then(()=>{
              console.log('increment added');
              totalQty+=1
              totalPrice += cartProduct.price
          })
               
            }
            else{
                console.log('user is not logged in to increment');
            }
        })
    }

    // cart product decrease functionality
    const cartProductDecrease =(cartProduct)=>{
        Item=cartProduct;
        if(Item.qty > 1){
            Item.qty=Item.qty-1;}
            Item.TotalProductPrice=Item.qty*Item.price;
             // updating in database
             onAuthStateChanged(auth,async user=>{
                if(user){
                    const cid = 'Cart ' + user.uid
                    const cartId = collection(fs, cid);
                    await updateDoc(doc(fs,cartId, cartProduct.ID), Item).then(()=>{
                  console.log('Decrement ');
                  totalQty-=1
                  totalPrice -= cartProduct.price
              })
                   
                }
                else{
                    console.log('user is not logged in to decrement');
                }
            })
        }
    
        const handleToken = async(token)=>{
            //  console.log(token);
            const cart = {name: 'All Products', totalPrice}
            const response = await axios.post('http://localhost:8080/checkout',{
                token,
                cart
            })
            console.log(response);
            let {status}=response.data;
            console.log(status);
            if(status==='success'){
                navigate('/');
                toast.success('Your order has been placed successfully', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                  });
                  
                  const uid = auth.currentUser.uid;
                  
                  const carts = await getDocs(collection(fs,'Cart ' + uid));
                  for(var snap of carts.docs){
                    await deleteDoc(doc(fs, 'Cart ' + uid, snap.id));
                      
                  }
            }
            else{
                alert('Something went wrong in checkout');
            }
         }
    return (
        
        <>
           <Navbar user={user} />           
            <br></br>
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>
                        <CartProducts cartProducts={cartProducts} cartProductIncrease={cartProductIncrease}
                           cartProductDecrease={cartProductDecrease}/>
                    </div>
                    <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br></br>
                        <div>
                        Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                        Total Price to Pay: <span>$ {totalPrice}</span>
                        </div>
                        <br></br>
                        <StripeCheckout
                        stripeKey='pk_test_51Kdw2DSHf6EloSqKqqtRwtKJnw1mcqZ9HwHuSEzFSVYj5BzVc82MqdUl6OzS8mhj1OecvJyuXuKRwHJRDBca7jtF00c1D1XU96'
                        token={handleToken}
                        billingAddress
                        shippingAddress
                        name='All Products'
                        amount={totalPrice * 100}
                        ></StripeCheckout>
                    </div>                         
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }           
        </>
    )
}
