import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitems, setcartitems] = useState({});
  const url = "https://food-del-backend-1s21.onrender.com"
  const [token,settoken] = useState("")
  const [food_list,setfoodlist] = useState([])

  const fetchfoodlist = async () => {
    const response = await axios.get(url+"/api/food/list")
    setfoodlist(response.data.data)
  }

  const addtocart = async (itemid) => {
    if (!cartitems[itemid]) {
      setcartitems((prev) => ({ ...prev, [itemid]: 1 }));
    } else {
      setcartitems((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
    }
    if (token) {
      await axios.post(url+"/api/cart/add",{itemid} , {headers:{token}})
    }
  };

  const removefromcart = async (itemid) => {
    setcartitems((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemid} , {headers:{token}})
    }
  };

  const get_totalamt = () => {
    let totalamount = 0;
    for (const item in cartitems) {
      if (cartitems[item] > 0) {
        let iteminfo = food_list.find((product) => {
          return product._id === item;
        });
        totalamount += iteminfo.price * cartitems[item];
      }
    }
    return totalamount;
  };

  const loadcartData = async (token) =>{
    const response = await axios.post(url+"/api/cart/get" ,{}, {headers:{token}})
    setcartitems(response.data.cartData)
  }

  useEffect(()=>{
    
    async function loaddata(){
      await fetchfoodlist()
      if(localStorage.getItem("token")){
        settoken(localStorage.getItem("token"))
        await loadcartData(localStorage.getItem("token"))
      }
    }
    loaddata()
  },[])
  

  const ContextValue = {
    food_list,
    cartitems,
    setcartitems,
    addtocart,
    removefromcart,
    get_totalamt,
    url,
    token,
    settoken
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreContextProvider;
