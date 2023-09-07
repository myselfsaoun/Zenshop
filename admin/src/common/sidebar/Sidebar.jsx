import "./sidebar.scss";
import {
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    AccountCircleOutlined,
    ExitToApp,
    InsertChart,
    LocalShipping,
    Dashboard,
    SettingsApplications,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/userReducer";
import { logout as logoutApi } from "../../redux/apiCalls";
import { toast } from 'react-toastify';

const Sidebar = () => {
    const { user } = useSelector(state => state.admin.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // handle logout
    const handleLogout = async () => {
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
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <ul className="sidebarList">
                        <h3 className="sidebarTitle">MAIN</h3>
                        <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <Dashboard className="sidebarIcon" />
                                Dashboard
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <AttachMoney className="sidebarIcon" />
                            Transactions
                        </li>

                        <h3 className="sidebarTitle">LISTS</h3>
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                Users
                            </li>
                        </Link>
                        <Link to="/products" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Products
                            </li>
                        </Link>
                        <Link to="/orders" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Orders
                            </li>
                        </Link>
                        <Link to="/categories" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Categories
                            </li>
                        </Link>
                        <Link to="/subcategories" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Sub Categories
                            </li>
                        </Link>

                        {/* <h3 className="sidebarTitle">USEFUL</h3>
                        <li className="sidebarListItem">
                            <InsertChart className="sidebarIcon" />
                            Stats
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon" />
                            Sales
                        </li>
                        <li className="sidebarListItem">
                            <LocalShipping className="sidebarIcon" />
                            Delivery
                        </li>
                        <li className="sidebarListItem">
                            <BarChart className="sidebarIcon" />
                            Reports
                        </li> */}

                        {/* <h3 className="sidebarTitle">NOTIFICATIONS</h3>
                        <li className="sidebarListItem">
                            <MailOutline className="sidebarIcon" />
                            Mail
                        </li>
                        <li className="sidebarListItem">
                            <DynamicFeed className="sidebarIcon" />
                            Feedback
                        </li>
                        <li className="sidebarListItem">
                            <ChatBubbleOutline className="sidebarIcon" />
                            Messages
                        </li> */}

                        <h3 className="sidebarTitle">USER</h3>
                        <Link
                            to={`/users/${user._id}`}
                            className="link"
                        >
                            <li className="sidebarListItem">
                                <AccountCircleOutlined className="sidebarIcon" />
                                <span>Profile</span>
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <SettingsApplications className="sidebarIcon" />
                            <span>Settings</span>
                        </li>
                        <li className="sidebarListItem"
                            onClick={handleLogout}
                        >
                            <ExitToApp className="sidebarIcon" />
                            <span>Logout</span>
                        </li>
                        <li className="sidebarListItem color">
                            <div
                                className="colorOption"
                            // onClick={() => dispatch({ type: "LIGHT" })}
                            ></div>
                            <div
                                className="colorOption"
                            // onClick={() => dispatch({ type: "DARK" })}
                            ></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;