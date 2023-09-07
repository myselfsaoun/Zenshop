import React, { useEffect, useState } from 'react';
import './subCategoryUpdate.scss';
import { useNavigate } from 'react-router-dom';
import { userRequest, publicRequest } from '../../utils/makeRequest';
import { toast } from 'react-toastify';

const CategoryUpdate = ({ subCategory }) => {
  const [title, seTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // set selected categories
  const handleCategories = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCategory(value);
  };

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    if(!title && !selectedCategory.length) {
      return toast.warn("Filled any updatd value!", { autoClose: 3000 });
    }

    const sendSubCategory = {
      ...subCategory,
      title: title ? title : subCategory?.title,
      categories: selectedCategory.length ? selectedCategory : subCategory.categories
    }
    // console.log("sendSubCategory", sendSubCategory);

    try {
      const res = await userRequest.put(
        `/subcategories/${subCategory._id}`, 
        sendSubCategory
      );

      if (res.data?.status !== 200) {
        return toast.error("Something went wrong!", { autoClose: 3000 });
      }

      toast.success(res.data?.message, { autoClose: 2000 });

      setTimeout(() => {
        res && navigate('/subcategories');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  // fetch all categories
  useEffect(() => {
    const getAllCategories = async () => {
      const res = await publicRequest.get('/categories/all');
      res.data && setCategories(res.data);
    }
    getAllCategories();
  }, []);

  return (
    <div className="subCategoryUpdate">
      <span className="subCategoryUpdateTitle">Edit</span>
      <form className="subCategoryUpdateForm">
        <div className="subCategoryUpdateItem">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder={subCategory?.title}
            className="subCategoryUpdateInput"
            required
            onChange={(e) => seTitle(e.target.value)}
          />
        </div>
        <div className="subCategoryUpdateItem">
          <label>Categories</label>
          <select
            multiple name="categories" id="categories"
            onChange={handleCategories}
          >
            {
              categories && categories?.map((cat, i) => (
                <option value={cat.title} key={i}>{cat.title}</option>
              ))
            }
          </select>
        </div>
        <button className="submit" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  )
}

export default CategoryUpdate;