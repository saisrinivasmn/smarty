import React, { useState ,useEffect} from 'react'
import { auth,fs } from '../Config/Config';
import { Navbar } from './Navbar';
import { getDatabase, ref, onValue} from "firebase/database";
import { Products } from './Products';
import { onAuthStateChanged } from "firebase/auth"
import { collection,setDoc,doc,getDoc,getDocs,onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const Machine1 = () => {
const navigate = useNavigate();

  const db = getDatabase();
  const [items,setItems] = useState([]);
  useEffect(() => {
    const items = ref(db,`vending_machine_1`);
    onValue(items,(snapshot) => {
      const data = (snapshot.val());
      console.log(data);
      const itemsArray = [];
      for(var key in data) {
        var dict = data[key];
        itemsArray.push(dict);
     }
     setItems(itemsArray);
     console.log(itemsArray);
    });


    return ;
  }, [db])
  
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

function GetUserUid(){
  const [uid, setUid]=useState(null);
  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
          if(user){
              setUid(user.uid);
          }
      })
  },[])
  return uid;
}

const uid = GetUserUid();



let Product;
  const addToCart = async (product)=>{

      if(uid!==null){
          Product=product;
          Product['qty']=1;
          Product['TotalProductPrice']=Product.qty*Product.price;
          const cid = 'Cart ' + uid
          
          const cartId = collection(fs, cid);
            await setDoc(doc(cartId, product.productName), Product).then(()=>{
              console.log('successfully added to cart');
          })
          console.log(Product)
      } 
      else{
          navigate('/login');
      }
      
  }

  return (
    <>
      <Navbar user={user}  />
      <br></br>
      {items.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Products</h1>
                    <div className='products-box'>
                        <Products products={items} addToCart={addToCart}/>
                    </div>
                </div>
            )}
            {items.length < 1 && (
                <div className='container-fluid'>Please wait....</div>
            )}
    </>
  )
}

