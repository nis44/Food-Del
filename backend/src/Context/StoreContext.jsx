import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitems, setcartitems] = useState({});

  const addtocart = (itemid) => {
    if (!cartitems[itemid]) {
      setcartitems((prev) => ({ ...prev, [itemid]: 1 }));
    } else {
      setcartitems((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
    }
  };

  const removefromcart = (itemid) => {
    setcartitems((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
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
  

  const ContextValue = {
    food_list,
    cartitems,
    setcartitems,
    addtocart,
    removefromcart,
    get_totalamt
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
