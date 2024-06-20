import { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import PropTypes from "prop-types";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

function LoginPopup({ setshowlogin }) {
  const { url, settoken } = useContext(StoreContext);
  const [current, setcurrent] = useState("Login");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let newurl = url;
    newurl += current === 'Login' ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(newurl, data);
      if (response.data.success) {
        settoken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setshowlogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login/register:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{current}</h2>
          <img
            onClick={() => setshowlogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {current === "Sign Up" && (
            <input
              type="text"
              name="name"
              onChange={onchangehandler}
              value={data.name}
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onchangehandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onchangehandler}
            value={data.password}
            type="password"
            placeholder="Your Password"
            required
          />
        </div>
        <button type="submit">
          {current === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-cond">
          <input type="checkbox" required />
          <p>By Continuing, I Agree to the Terms of Use & Policy Service</p>
        </div>
        {current === "Login" ? (
          <p>
            Create A New Account?{" "}
            <span onClick={() => setcurrent("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already Have An Account?{" "}
            <span onClick={() => setcurrent("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
}

LoginPopup.propTypes = {
  setshowlogin: PropTypes.func.isRequired,
};

export default LoginPopup;
