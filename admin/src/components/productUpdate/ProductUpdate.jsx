import React, { useState } from 'react';
import './productUpdate.scss';
import { Publish } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from '../../config/firebase';
import { userRequest } from '../../utils/makeRequest';
const DEFAULT_IMG_URL = "https://i.ibb.co/MBtjqXQ/no-avatar.gif";
import { toast } from 'react-toastify';
import SubmitBtn from '../../common/submitBtn/SubmitBtn';

const ProductUpdate = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [updatedProductFiles, setUpdatedProductFiles] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [uploaded, setUploaded] = useState(0);

  const navigate = useNavigate();

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // multiple file upload using firebase
  const upload = (items) => {
    let count = 0;
    setFileLoading(true);

    items.forEach(item => {
      // firebase setup
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storage = getStorage(app);

      const storageRef = ref(storage, `/products/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

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
            setUpdatedProduct(prev => {
              return {
                ...prev,
                [item.label]: downloadURL
              }
            });

            count += 1;
            count === 2 && setFileLoading(false);
            setUploaded(prev => prev + 1);
          });
        }
      );
    });
  }

  // handle upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (updatedProductFiles === null) {
      return toast.warn("Select Product Pictures!", { autoClose: 3000 });
    }

    const files = Object.values(updatedProductFiles).map(file => file);

    upload([
      { file: files[0], label: "img" },
      { file: files[1], label: "img2" },
    ])
  }

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (updatedProduct.color) {
      updatedProduct["color"] = updatedProduct?.color?.split(",");
    }
    if (updatedProduct.size) {
      updatedProduct["size"] = updatedProduct?.size?.split(",");
    }

    const len =  Object.keys(updatedProduct).length;

    if (!len) {
      return toast.warn("Filled any updated value!", { autoClose: 3000 });
    }

    const sendProduct = {
      ...product,
      ...updatedProduct
    }
    // console.log("sendProduct", sendProduct);

    try {
      const res = await userRequest.put(`/products/${product._id}`, sendProduct);

      if (res.data?.status !== 200) {
        return toast.error("Something went wrong!", { autoClose: 3000 });
      }

      toast.success(res.data?.message, { autoClose: 2000 });

      setTimeout(() => {
        res && navigate('/products');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="productUpdate">
      <span className="productUpdateTitle">Edit</span>
      <form className="productUpdateForm">
        <div className="productUpdateFormWrapper">
          <div className="productUpdateLeft">
            <div className="productUpdateItem">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder={product?.title}
                className="productUpdateInput"
                required
                onChange={handleChange}
              />
            </div>
            <div className="productUpdateItem">
              <label>Description</label>
              <input
                type="text"
                name="desc"
                placeholder={product?.desc}
                className="productUpdateInput"
                required
                onChange={handleChange}
              />
            </div>
            <div className="productUpdateItem">
              <label>Price</label>
              <input
                type="text"
                name="price"
                placeholder={product?.price}
                className="productUpdateInput"
                onChange={handleChange}
              />
            </div>
            <div className="productUpdateItem">
              <label style={{ marginBottom: "5px" }}>Type</label>
              <select name="type" id="type" onChange={handleChange}>
                <option value="normal">Normal</option>
                <option value="featured">Featured</option>
                <option value="trending">Trending</option>
              </select>
            </div>
            <div className="productUpdateItem">
              <label style={{ marginBottom: "5px" }}>IsNew?</label>
              <select name="isUpdated" id="isUpdated" onChange={handleChange}>
                <option value={true}>true</option>
                <option value={false}>false</option>
              </select>
            </div>
            <div className="productUpdateItem">
              <label style={{ marginBottom: "5px" }}>InStock?</label>
              <select name="inStock" id="inStock" onChange={handleChange}>
                <option value={true}>true</option>
                <option value={false}>false</option>
              </select>
            </div>
          </div>
          <div className="productUpdateRight">
            <div className="productUpdateWrapper">
              <div className="productUpdateUpload">
                {
                  updatedProductFiles ? (
                    <img
                      className="productUpdateImg"
                      src={
                        updatedProductFiles
                          ? URL.createObjectURL(updatedProductFiles[0])
                          : DEFAULT_IMG_URL
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      className="productUpdateImg"
                      src={
                        product?.img || DEFAULT_IMG_URL
                      }
                      alt=""
                    />
                  )
                }
                <label htmlFor="file">
                  <Publish className="productUpdateIcon" />
                </label>
                <input multiple type="file"
                  name="file" id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setUpdatedProductFiles(e.target.files)}
                />
              </div>
              {
                fileLoading ? (
                  <button className="productUpdateButton">Uploading...</button>
                ) : uploaded === 2 ? (
                  <button className="productUpdateButton">Uploaded</button>
                ) : (
                  <button className="productUpdateButton"  onClick={handleUpload}>Upload</button>
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

export default ProductUpdate;