import "./widgetSm.scss";
import { Visibility } from "@mui/icons-material";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
const DEFAULT_IMG_URL = "https://i.ibb.co/MBtjqXQ/no-avatar.gif";

const WidgetSm = () => {
    const {
        data, loading, error
    } = useFetch("/users/all", "userRequest");

    return (
        <div className="widgetSm">
            {
                loading ? (
                    "Loading..."
                ) : error ? (
                    "Something went wrong!"
                ) : (
                    <>
                        <span className="widgetSmTitle">New Join Members</span>
                        <ul className="widgetSmList">
                            {
                                data && data?.map(user => (
                                    <li className="widgetSmListItem" key={user?._id}>
                                        <img
                                            src={user?.profilePic || DEFAULT_IMG_URL}
                                            alt=""
                                            className="widgetSmImg"
                                        />
                                        <div className="widgetSmUser">
                                            <span className="widgetSmUsername">{user?.username}</span>
                                        </div>
                                        <Link 
                                            to={`/users/${user?._id}`}
                                            className="link"
                                        >
                                            <button className="widgetSmButton">
                                                <Visibility className="widgetSmIcon" />
                                                Display
                                            </button>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                )
            }
        </div>
    );
}


export default WidgetSm;