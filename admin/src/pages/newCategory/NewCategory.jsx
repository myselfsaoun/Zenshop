import './newCategory.scss';
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { userRequest } from '../../utils/makeRequest';
import { categoryInputs } from '../../data/FormSource';
// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from "../../config/firebase";
import NO_IMG_ICON from "../../assets/no-image-icon.jpeg";
import { toast } from 'react-toastify';
import SubmitBtn from '../../common/submitBtn/SubmitBtn';

const NewUser = () => {
  const [newCategory, setNewCategory] = useState({});
  const [file, setFile] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const navigate = useNavigate();

  // set user input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value
    }))
  };

  // file upload using firebase
  const handleUpload = (e) => {
    e.preventDefault();

    if (!file?.name) {
      return toast.warn("Select category picture!", { autoClose: 3000 });
    }

    setFileLoading(true);

    // firebase setup
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);

    const storageRef = ref(storage, `/users/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
          setNewCategory(prev => {
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

  // sumbit user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title, desc, img
    } = newCategory;

    if(!title || !desc || !img) {
      return toast.warn("Filled all the details!", { autoClose: 3000 });
    }

    // console.log(newCategory);

    try {
      const res = await userRequest.post("/categories", newCategory);

      if (res.data?.status !== 201) {
        return toast.err("Something went wrong!", { autoClose: 3000 });
      }

      toast.success(res.data?.message, { autoClose: 1500 });

      setTimeout(() => {
        navigate('/categories');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='newCategory'>
      <div className="top">
        <h1>ADD NEW CATEGORY</h1>
      </div>
      <div className="bottom">
        <div className="wrapper">
          <div className="left">
            <div className="leftWrapper">
              <img
                src={
                  file ? URL.createObjectURL(file) : NO_IMG_ICON
                }
                alt=""
              />
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
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor='file'>
                  Image: <DriveFolderUploadOutlined className='icon' />
                </label>
                <input type="file" name="file" id='file'
                  style={{ display: "none" }}
                  onChange={e => setFile(e.target.files[0])}
                />
              </div>
              {
                categoryInputs.map((input, i) => (
                  <div className="formInput" key={i}>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                    />
                  </div>
                ))
              }
            </form>
          </div>
        </div>
        <SubmitBtn submit={handleSubmit} title="Create" type="end" />
        {/* <div className="submit">
          <button onClick={handleSubmit}>Create</button>
        </div> */}
      </div>
    </div>
  )
}

export default NewUser;

