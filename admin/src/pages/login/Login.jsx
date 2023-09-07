import { useState } from "react";
import "./login.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from "../../redux/apiCalls";
import { loginSuccessful } from '../../redux/userReducer';
import { toast, ToastContainer } from 'react-toastify';
// import { mobile } from "../responsive";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(
      { ...user, [name]: value }
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(dispatch, { email, password });

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

    toast.success(res?.message, { autoClose: 1500 });

    setTimeout(() => {
      dispatch(loginSuccessful(res));
      navigate('/');
    }, 2000);
  }


  return (
    <div className="login">
      <div className="loginWrapper">
        <h1 className="loginTitle">SIGN IN</h1>
        <form className="loginForm">
          <input type="email" placeholder="email" value={email} name="email"
            required onChange={handleChange}
          />
          <input placeholder="password" type="password" name="password" value={password}
            required onChange={handleChange}
          />
          <button className="loginButton" onClick={handleSubmit}>
            LOGIN
          </button>
          {/* {
            isError && <p className="loginFormError">Something went wrong...</p>
          } */}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
