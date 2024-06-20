import { useContext } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../Context/StoreContext'

function Placeorder() {
  const {get_totalamt} = useContext(StoreContext)
  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title"></p>
        <div className="multi-feild">
          <input type="text" placeholder='First Name'/>
          <input type="text" placeholder='Last Name'/>
        </div>
        <input type="email" placeholder='Email Address'/>
        <input type="text" placeholder='Street'/>
        <div className="multi-feild">
          <input type="text" placeholder='City'/>
          <input type="text" placeholder='State'/>
        </div>
        <div className="multi-feild">
          <input type="text" placeholder='Zip Code'/>
          <input type="text" placeholder='Country'/>
        </div>
        <input type="text" placeholder='Phone No.'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${get_totalamt()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Total</p>
              <p style={{fontWeight : 700}}>${get_totalamt() === 0 ? 0 : get_totalamt()+2}</p>
            </div>

          </div>
          <button >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder