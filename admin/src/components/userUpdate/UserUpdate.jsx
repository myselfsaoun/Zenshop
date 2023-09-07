import React, { useState } from 'react'
import './userUpdate.scss';
import { Publish } from "@mui/icons-material";
const DEFAULT_IMG_URL = "https://i.ibb.co/MBtjqXQ/no-avatar.gif";

// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from '../../config/firebase';
import { userRequest } from '../../utils/makeRequest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SubmitBtn from '../../common/submitBtn/SubmitBtn';

const UserUpdate = ({ user }) => {
  const [updatedUser, setUpdatedUser] = useState({});
  const [updatedProfilePic, setUpdatedProfilePic] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [uploaded, setUploaded] = useState(0);

  const navigate = useNavigate();

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // file upload using firebase
  const handleUpload = (e) => {
    e.preventDefault();

    if (!updatedProfilePic?.name) {
      return toast.warn("Select Profile Picture!", { autoClose: 3000 });
    }

    setFileLoading(true);

    // firebase setup
    const fileName = new Date().getTime() + updatedProfilePic.name;
    const storage = getStorage(app);

    const storageRef = ref(storage, `/users/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, updatedProfilePic);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (err) => {
        // Handle unsuccessful uploads
        console.log(err.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUpdatedUser(prev => {
            return {
              ...prev,
              "profilePic": downloadURL
            }
          });

          setFileLoading(false);
          setUploaded(prev => prev + 1);
        });
      }
    );
  };

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const len =  Object.keys(updatedUser).length;

    if (!len) {
      return toast.warn("Filled any updated value!", { autoClose: 3000 });
    }

    const sendUser = {
      ...user,
      ...updatedUser
    }

    try {
      const res = await userRequest.put(`/users/${user._id}`, sendUser);

      if (res.data?.status !== 200) {
        return toast.error("Something went wrong!", { autoClose: 3000 });
      }

      toast.success(res.data?.message, { autoClose: 2000 });

      setTimeout(() => {
        res && navigate('/users');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="userUpdate">
      <span className="userUpdateTitle">Edit</span>
      <form className="userUpdateForm">
        <div className="userUpdateFormWrapper">
          <div className="userUpdateLeft">
            <div className="userUpdateItem">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder={user?.username}
                className="userUpdateInput"
                required
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder={user?.email}
                className="userUpdateInput"
                required
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                placeholder={user?.phone || "+8880 1728 276823"}
                className="userUpdateInput"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="userUpdateRight">
            <div className="userUpdateUpload">
              {
                updatedProfilePic ? (
                  <img
                    className="userUpdateImg"
                    src={
                      updatedProfilePic
                        ? URL.createObjectURL(updatedProfilePic)
                        : DEFAULT_IMG_URL
                    }
                    alt=""
                  />
                ) : (
                  <img
                    className="userUpdateImg"
                    src={
                      user?.profilePic || DEFAULT_IMG_URL
                    }
                    alt=""
                  />
                )
              }
              <label htmlFor="file">
                <Publish className="userUpdateIcon" />
              </label>
              <input type="file" name="file" id="file"
                style={{ display: "none" }}
                onChange={(e) => setUpdatedProfilePic(e.target.files[0])}
              />
            </div>
            {
              fileLoading ? (
                <button className="userUpdateButton">Uploading...</button>
              ) : uploaded === 1 ? (
                <button className="userUpdateButton">Uploaded</button>
              ) : (
                <button className="userUpdateButton" onClick={handleUpload}>Upload</button>
              )
            }
          </div>
        </div>
        <SubmitBtn submit={handleUpdate} title="Update" type="start" />

        {/* <div className="submit">
          <button onClick={handleUpdate}>Update</button>
        </div> */}
      </form>
    </div>
  )
}

export default UserUpdate;