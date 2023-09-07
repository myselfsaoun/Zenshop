import React, { useState } from 'react';
import './categoryUpdate.scss';
import { Publish } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../../utils/makeRequest';
// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from '../../config/firebase';
const DEFAULT_IMG_URL = "https://i.ibb.co/MBtjqXQ/no-avatar.gif";
import { toast } from 'react-toastify';
import SubmitBtn from '../../common/submitBtn/SubmitBtn';

const CategoryUpdate = ({ category }) => {
  const [updatedCategory, setUpdatedCategory] = useState({});
  const [updatedCategoryFile, setUpdatedCategoryFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [uploaded, setUploaded] = useState(0);

  const navigate = useNavigate();

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // file upload using firebase
  const handleUpload = (e) => {
    e.preventDefault();

    if (!updatedCategoryFile?.name) {
      return toast.warn("Select category picture!", { autoClose: 3000 });
    }

    setFileLoading(true);

    // firebase setup
    const fileName = new Date().getTime() + updatedCategoryFile.name;
    const storage = getStorage(app);

    const storageRef = ref(storage, `/users/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, updatedCategoryFile);

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
          setUpdatedCategory(prev => {
            return {
              ...prev,
              "img": downloadURL
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

    const len =  Object.keys(updatedCategory).length;

    if (!len) {
      return toast.warn("Filled any updated value!", { autoClose: 3000 });
    }

    const sendCategory = {
      ...category,
      ...updatedCategory
    }

    // console.log("sendCategory", sendCategory);

    try {
      const res = await userRequest.put(`/categories/${category._id}`, sendCategory);

      if (res.data?.status !== 200) {
        return toast.error("Something went wrong!", { autoClose: 3000 });
      }

      toast.success(res.data?.message, { autoClose: 2000 });

      setTimeout(() => {
        res && navigate('/categories');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="categoryUpdate">
      <span className="categoryUpdateTitle">Edit</span>
      <form className="categoryUpdateForm">
        <div className="categoryUpdateFormWrapper">
          <div className="categoryUpdateLeft">
            <div className="categoryUpdateItem">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder={category?.title}
                className="categoryUpdateInput"
                required
                onChange={handleChange}
              />
            </div>
            <div className="categoryUpdateItem">
              <label>Description</label>
              <input
                type="text"
                name="desc"
                placeholder={category?.desc}
                className="categoryUpdateInput"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="categoryUpdateRight">
            <div className="categoryUpdateWrapper">
              <div className="categoryUpdateUpload">
                {
                  updatedCategoryFile ? (
                    <img
                      className="categoryUpdateImg"
                      src={
                        updatedCategoryFile
                          ? URL.createObjectURL(updatedCategoryFile)
                          : DEFAULT_IMG_URL
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      className="categoryUpdateImg"
                      src={
                        category?.img || DEFAULT_IMG_URL
                      }
                      alt=""
                    />
                  )
                }
                <label htmlFor="file">
                  <Publish className="categoryUpdateIcon" />
                </label>
                <input type="file"
                  name="file" id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setUpdatedCategoryFile(e.target.files[0])}
                />
              </div>
              {
                fileLoading ? (
                  <button className="categoryUpdateButton">Uploading...</button>
                ) : uploaded === 1 ? (
                  <button className="categoryUpdateButton">Uploaded</button>
                ) : (
                  <button className="categoryUpdateButton" onClick={handleUpload}>Upload</button>
                )
              }
            </div>
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

export default CategoryUpdate;