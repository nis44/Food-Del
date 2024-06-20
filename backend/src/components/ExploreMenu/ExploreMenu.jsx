import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'
import PropTypes from 'prop-types';


function ExploreMenu(props) {
  let {category,setcategory} = props
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a delecatable array of dishes crafted with the finest ingridients and culinary expertise. our mission is to satisfy your cravings and elevate your dining experience , one delicious meal at a time.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>{setcategory(prev=>prev===item.menu_name?"All":item.menu_name)}} key={index} className="explore-menu-list-item">
                         <img className={category===item.menu_name?'active':''} src={item.menu_image} alt="" />
                         <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}
ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired, // Assuming category is a string
  setcategory: PropTypes.func.isRequired // Assuming setcategory is a function
};

export default ExploreMenu;

