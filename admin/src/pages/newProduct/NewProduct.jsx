import "./newProduct.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productInputs } from "../../data/FormSource";
import useFetch from "../../hooks/useFetch";
import { userRequest } from "../../utils/makeRequest";
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

const NewHotel = () => {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [files, setFiles] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [uploaded, setUploaded] = useState(0);

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError
  } = useFetch("/categories/all");

  const {
    data: subCategoryData,
    loading: subCategoryLoading,
    error: subCategoryError
  } = useFetch("/subcategories/all");

  const navigate = useNavigate();

  // set product
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // set categories
  const handleCategories = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCategories(value);
  };

  // set subCategories
  const handleSubCategories = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSubCategories(value);
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
            setProduct(prev => {
              return {
                ...prev,
                [item.label]: downloadURL
              }
            });

            count += 1;
            console.log(items.length)
            count === (items.length - 1) && setFileLoading(false);
            setUploaded(prev => prev + 1);
          });
        }
      );
    })
  }

  // handle upload
  const handleUpload = async (e) => {
    e.preventDefault();

    const productImg = Object.values(files).map(file => file);

    if (!productImg.length) {
      return toast.warn("Select product pictures!", { autoClose: 3000 });
    }

    if (productImg.length === 2) {
      upload([
        { file: productImg[0], label: "img" },
        { file: productImg[1], label: "img2" },
      ]);
    } else {
      upload([
        { file: productImg[0], label: "img" },
      ]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const colorArr = product?.color?.split(",");
    // const sizeArr = product?.size?.split(",");

    const {
      title, desc, price
    } = product;

    if (!title || !desc || !price || !categories.length || !subCategories.length) {
      return toast.warn("Filled all the details!", { autoClose: 3000 });
    }

    if (!product?.img || !product?.img2) {
      return toast.warn("Select all the product picture!", { autoClose: 3000 });
    }

    const newProduct = {
      ...product,
      categories: categories[0],
      subCategories: subCategories[0]
    };

    try {
      const res = await userRequest.post("/products", newProduct);

      if (res.data?.status !== 201) {
        return toast.err("Something went wrong!", { autoClose: 3000 });
      }

      toast.success(res.data?.message, { autoClose: 1500 });
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (err) {
      console.log(err)
      return toast.error("Something went wrong!", { autoClose: 3000 });
    }
  };

  return (
    <div className='new'>
      <div className="top">
        <h1>Add New Product</h1>
      </div>
      <div className="bottom">
        <div className="newWrapper">
          <div className="left">
            <div className="leftWrapper">
              <img
                src={
                  files.length >= 1 ? URL.createObjectURL(files[0]) : NO_IMG_ICON
                }
                alt=""
              />
              <img
                src={
                  files.length >= 2 ? URL.createObjectURL(files[1]) : NO_IMG_ICON
                }
                alt=""
              />
              {
                fileLoading ? (
                  <button className="productUpdateButton">Uploading...</button>
                ) : (
                  uploaded === 2 ? (
                    <button className="productUpdateButton" onClick={handleSubmit}>Uploaded</button>
                  ) : (
                    <button className="productUpdateButton" onClick={handleUpload}>Upload</button>
                  )
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
                <input
                  type="file"
                  name="file"
                  id='file'
                  multiple
                  onChange={e => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              {
                productInputs.map((input, i) => (
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
              <div className="formInput2">
                <label style={{ marginBottom: "5px" }}>Type</label>
                <select name="type" id="type" onChange={handleChange}>
                  <option>Type</option>
                  <option value="normal">Normal</option>
                  <option value="featured">Featured</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
              <div className="formInput2">
                <label style={{ marginBottom: "5px" }}>IsNew?</label>
                <select name="isUpdated" id="isUpdated" onChange={handleChange}>
                  <option>IsNew?</option>
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </select>
              </div>
              <div className="formInput2">
                <label style={{ marginBottom: "5px" }}>InStock?</label>
                <select name="inStock" id="inStock" onChange={handleChange}>
                  <option>InStock?</option>
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </select>
              </div>
              <div className="formInput3">
                <label>Categories</label>
                <select
                  name="categories" id="categories"
                  multiple onChange={handleCategories}
                >
                  {
                    categoryLoading ? (
                      "Loading please wait..."
                    ) : categoryError ? (
                      "Something went wrong!!"
                    ) : (
                      categoryData && categoryData.map(cat => (
                        <option key={cat._id} value={cat.title}>
                          {cat.title}
                        </option>
                      ))
                    )
                  }
                </select>
              </div>
              <div className="formInput3">
                <label>Sub categories</label>
                <select
                  name="subCategories" id="subCategories"
                  multiple onChange={handleSubCategories}
                >
                  {
                    subCategoryLoading ? (
                      "Loading please wait..."
                    ) : subCategoryError ? (
                      "Something went wrong!!"
                    ) : (
                      subCategoryData && subCategoryData.map(subCat => (
                        <option key={subCat._id} value={subCat.title}>
                          {subCat.title}
                        </option>
                      ))
                    )
                  }
                </select>
              </div>
            </form>
          </div>
        </div>
          <SubmitBtn submit={handleSubmit} title="Create" type="end" />
        {/* <div className="submit">
          <button onClick={handleSubmit}>Create</button>
        </div> */}
      </div>
    </div>
  );
};

export default NewHotel;