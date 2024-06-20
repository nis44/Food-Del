import { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';

function List({url}) {
  const [list ,setlist] = useState([])



  const fetchlist = async ()=>{
    const response = await axios.get(`${url}/api/food/list`)
    // console.log(response.data)
    if(response.data.success){
      setlist(response.data.data)
    }
    else{
      toast.error('Error')
    }
  }

  const removefood = async (foodid) => {
    const response = await axios.post(`${url}/api/food/remove` , {id:foodid})
    await fetchlist()
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchlist()
  },[url])

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>{removefood(item._id)}} className='cursor'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

List.propTypes = {
  url: PropTypes.string.isRequired
};

export default List