import React from 'react'
import './error.scss';
import { NavLink } from 'react-router-dom';
import ErrorLogo from "../../assets/404.svg";

const Error = () => {
  return (
    <div className='error'>
      <img src={ErrorLogo} alt="error" />
      <h2>PAGE NOT FOUND</h2>
      <NavLink
        to="/"
        style={{
          fontSize: 18,
          marginTop: "10px",
          textDecoration: "none"
        }}
      >
        Back To Home Page
      </NavLink>
    </div>
  )
}

export default Error;