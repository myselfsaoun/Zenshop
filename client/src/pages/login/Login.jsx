import React, { useState } from 'react';
import './login.scss';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from "../../redux/apiCalls";
import { toast } from "react-toastify";
import { loginSuccessful } from '../../redux/userReducer';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [passShow, setPassShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser(() => {
      return {
        ...user,
        [name]: value
      }
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(dispatch, user);
    setUser({
      email: "",
      password: ""
    });

    if (res.status === 422) {
      return toast.warn(res.message, { autoClose: 3000 });
    }

    if (res.status === 404 || res.status === 400) {
      return toast.error(res.message, { autoClose: 3000 });
    }

    toast.success(res.message, { autoClose: 1500 });

    setTimeout(() => {
      dispatch(loginSuccessful(res));
      navigate('/', {state: { refresh: true} });
    }, 2000);
  }

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={user.email}
                onChange={handleChange}
                name="email" id="email"
                placeholder='enter email'
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={handleChange}
                  value={user.password}
                  name="password" id="password"
                  placeholder='enter password'
                />
                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className='btn' onClick={handleSubmit}>Login</button>
            <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
            {/* <p style={{ color: "black", fontWeight: "bold" }}>Forgot Password  <NavLink to="/password-reset">Click Here</NavLink> </p> */}
          </form>
        </div>
      </section>
    </>
  )
}

export default Login;