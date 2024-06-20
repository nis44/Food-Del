import { useState } from 'react'
import { assets } from '../../assets/admin_assets/assets'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';

function Add({url}) {

    // const url = 'http://localhost:4000'

    const [image , setimage] = useState(false)
    const [data , setdata] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })

    const onChangeHandler = (event) =>{
            const name = event.target.name;
            const value = event.target.value;
            setdata(data=>({...data,[name]:value}))
    }

    const onsubmithandler = async (event) => {
        event.preventDefault();
    
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("description", data.description);
        formdata.append("price", data.price);
        formdata.append("category", data.category);
        formdata.append("image", image); // Use the image state here
    
        try {
            const response = await axios.post(`${url}/api/food/add`, formdata);
            if (response.data.success) {
                setdata({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setimage(false);
                toast.success(response.data.message)
            }
        } catch (error) {
            console.error('Error adding food:', error);
            // Handle error state or display error message
        }
    };
    

  return (
    <div className='add'>
        <form onSubmit={onsubmithandler} className="flex-col">
            <div className="add-image-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setimage(e.target.files[0])} type="file" id="image" hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type Here" />
            </div>
            <div className="add-product-desc flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler}  value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category">
                        <option value="">Choose from here</option>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20'/>
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

Add.propTypes = {
    url: PropTypes.string.isRequired
};

export default Add