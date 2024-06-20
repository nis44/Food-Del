import { useContext } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import './FoodItem.css'
import PropTypes from 'prop-types';
import { StoreContext } from '../../Context/StoreContext';

function FoodItem({id,name,price,descrption,image}) {

    let {cartitems,addtocart,removefromcart , url} = useContext(StoreContext)
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {
                !cartitems[id]
                ?<img className='add' onClick={()=>addtocart(id)} src={assets.add_icon_white} alt="" />
                :<div className='food-item-counter'>
                    <img onClick={()=>removefromcart(id)} src={assets.remove_icon_red} alt="" />
                    <p className='count'>{cartitems[id]}</p>
                    <img onClick={()=>addtocart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">
                {descrption}
            </p>
            <p className="food-item-price">
                ${price}
            </p>
        </div>
    </div>
  )
}

FoodItem.propTypes = {

    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    descrption: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  };

export default FoodItem