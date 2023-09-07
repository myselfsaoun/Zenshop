import "./profile.scss";
import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@mui/icons-material";
import ProfileUpdate from "../../components/profileUpdate/ProfileUpdate";
import { useSelector } from "react-redux";
const DEFAULT_IMG_URL = "https://i.ibb.co/MBtjqXQ/no-avatar.gif";

const Profile = () => {
  const user = useSelector(state => state.user?.currentUser?.user);

  // get date from createdAt
  const getFullDate = (time) => {
    let date = new Date(time).getDate();
    let month = new Date(time).getMonth() + 1;
    const year = new Date(time).getFullYear();

    date = date.toString().length === 1 ? ("0" + date) : date;
    month = month.toString().length === 1 ? ("0" + month) : month;

    const fullDate = date + '.' + month + '.' + year;
    return fullDate;
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h2 className="userTitle">
          User Profile
        </h2>
      </div>
      <div className="userTop">
        <div className="userLeft">
          <div className="userInfoTop">
            <img
              src={user?.profilePic || DEFAULT_IMG_URL}
              alt=""
              className="userInfoImg"
            />
            <div className="userInfoTitle">
              <span className="username">{user?.username}</span>
            </div>
          </div>
          <div className="userInfoBottom">
            <span className="userInfoTitle">Account Details</span>
            <div className="userInfoItem">
              <PermIdentity className="userInfoIcon" />
              <span className="userInfoValue">{user?.username}</span>
            </div>
            <div className="userInfoItem">
              <CalendarToday className="userInfoIcon" />
              <span className="userInfoValue">
                {getFullDate(user?.createdAt)}
              </span>
            </div>
            <span className="userInfoTitle">Contact Details</span>
            <div className="userInfoItem">
              <PhoneAndroid className="userInfoIcon" />
              <span className="userInfoValue">
                {user?.phone || "+880 1303 110760"}
              </span>
            </div>
            <div className="userInfoItem">
              <MailOutline className="userInfoIcon" />
              <span className="userInfoValue">{user?.email}</span>
            </div>
            {/* <div className="userInfoItem">
              <LocationSearching className="userInfoIcon" />
              <span className="userInfoValue">New York | USA</span>
            </div> */}
          </div>
        </div>
        <div className="userRight">
          <ProfileUpdate />
        </div>
      </div>
    </div>
  );
}

export default Profile;