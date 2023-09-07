import React, { useState } from "react";
import "./navbar.scss";
import {
  NotificationsNone, Language, ArrowDropDown,
  DarkModeOutlined, ChatBubbleOutlineOutlined,
  ListOutlined, FullscreenExitOutlined
} from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../redux/userReducer";
import { Link, useNavigate } from 'react-router-dom';
const DEFAULT_IMG_URL = "https://i.ibb.co/MBtjqXQ/no-avatar.gif";
import { logout as logoutApi } from "../../redux/apiCalls";
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user } = useSelector(state => state.admin?.currentUser);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle logout
  const handleLogout = async () => {
    setShow(!show);

    const res = await logoutApi();

    if (res.status !== 200) {
      return toast.error("Something went wrong!", { autoClose: 3000 });
    }

    toast.success(res.message, { autoClose: 1500 });
    localStorage.removeItem('hasRefreshedAdmin');

    setTimeout(() => {
      dispatch(logout());
      navigate('/login');
    }, 2000);
  }

  return (
    <div className='topbar'>
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to={"/"} className="link">
            <span className="logo">ZenShop</span>
          </Link>
        </div>

        <div className="topRight">
          <div className="topbarIconContainer">
            <Language />
          </div>
          <div className="topbarIconContainer">
            <DarkModeOutlined />
          </div>
          {/* <div className="topbarIconContainer">
            <FullscreenExitOutlined />
          </div> */}
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <ChatBubbleOutlineOutlined />
            <span className="topIconBadge">2</span>
          </div> */}
          <div className="topbarIconContainer">
            <ListOutlined />
          </div>
          <div className="topbarIconContainer">
            <img
              src={user?.profilePic || DEFAULT_IMG_URL}
              alt="" className="topAvatar"
            />
          </div>
          <div className={show ? "profile show" : "profile"}>
            <ArrowDropDown
              className='icon'
              onClick={() => setShow(!show)}
            />
            <div className="options">
              <Link to={`/users/${user._id}`} className="link">
                <span onClick={() => setShow(!show)}>Profile</span>
              </Link>
              <span
                onClick={handleLogout}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar