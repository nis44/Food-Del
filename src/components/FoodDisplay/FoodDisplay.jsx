import { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import PropTypes from 'prop-types';
import FoodItem from '../FoodItem/FoodItem';

function FoodDisplay({category}) {
    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display' >
        <h2>Top Dishes Near You</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
                if(category === "All" || category === item.category ){
                    return <FoodItem key={index} id={item._id} name={item.name} descrption={item.description} price={item.price} image = {item.image}/>

                }
                
            })}
        </div>
    </div>
  )
}
FoodDisplay.propTypes = {
    category: PropTypes.string.isRequired
  };
  

export default FoodDisplay