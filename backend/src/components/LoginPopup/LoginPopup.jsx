import { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import PropTypes from "prop-types";

function LoginPopup({ setshowlogin }) {
  let [current, setcurrent] = useState("Login");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{current}</h2>
          <img
            onClick={() => setshowlogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {current === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your Name" required />
          )}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Your Password" required />
        </div>
        <button>{current === "Sign Up" ? "Create Account" : "Login"} </button>
        <div className="login-popup-cond">
          <input type="checkbox" required />
          <p>By Continuing, I Agree to the Terms of Use & Policy Service</p>
        </div>
        {current === "Login" ? (
          <p>
            Create A New Account? <span onClick={()=>setcurrent("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already Have An Account? <span onClick={()=>setcurrent("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
}

LoginPopup.propTypes = {
  setshowlogin: PropTypes.func.isRequired, // Assuming setcategory is a function
};

export default LoginPopup;
