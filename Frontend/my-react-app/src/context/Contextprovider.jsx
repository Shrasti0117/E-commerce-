import React, { createContext, useEffect, useState } from 'react'


export const Context = createContext(null);

 const getDefaultcart =()=>{
        let cart = {};
        for(let index = 1; index < 300+1; index++) {
            cart[index] = 0; // Initialize each product's quantity to 0
        }
        return cart;
    }

const Contextprovider = (props) => {

    const [all_product,setall_product] = useState([]);

     const [cartitem,setcartitem]= useState(getDefaultcart());

     useEffect(()=>{
         fetch('http://localhost:4000/allproducts')
         .then((response)=> response.json())
         .then((data)=> setall_product(data))
     },[])
    
   const addtocart = (itemId) => {
     setcartitem((prevCart) => ({
       ...prevCart,
       [itemId]: prevCart[itemId] + 1
     }));
     const token = localStorage.getItem('auth-token');
     if (token) {
       fetch('http://localhost:4000/addtocart', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'auth-token': token,
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ itemId, userId: localStorage.getItem('userId') || null }),
       })
         .then((response) => response.json())
         .then((data) => console.log(data));
     }
   }

   useEffect(() => {
     console.log(cartitem);
   }, [cartitem]);
       
   const getTotalcartammount = () => {
    let totalammount = 0;
    if (!cartitem || !all_product || !Array.isArray(all_product)) return totalammount;
    for(const item in cartitem) {
       if(cartitem[item] > 0) {
           const iteminfo = all_product.find((product) => product.id === Number(item));
           if (iteminfo && iteminfo.new_price) {
             totalammount += iteminfo.new_price * cartitem[item];
           }
       }
    }
    return totalammount;
  }

    const removefromcart = (itemId) => {
        setcartitem((prevCart) => ({
            ...prevCart,
            [itemId]: Math.max((prevCart[itemId] || 0) - 1, 0) // Ensure quantity doesn't go below 0
        }));
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId, userId: localStorage.getItem('userId') || null }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    }

    const gettotalitems = () => {
        let totalitem = 0;
        if (!cartitem) return totalitem;
        for (const item in cartitem) {
            if (cartitem[item] > 0) {
                totalitem += cartitem[item];
            }
        }
        return totalitem;
    }
    const contextValue = { all_product, gettotalitems, getTotalcartammount, cartitem, addtocart, removefromcart };


    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default Contextprovider;
