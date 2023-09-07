import './newSubCategory.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { userRequest, publicRequest } from '../../utils/makeRequest';
import { toast } from 'react-toastify';

const NewUser = () => {
  const [title, setTitle] = useState("");
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

  // sumbit user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title || !selectedCategory.length) {
      return toast.warn("Filled all the details!", { autoClose: 3000 });
    }

    const newSubCategory = {
      title, 
      categories: selectedCategory
    }
    // console.log(newSubCategory);

    try {
      const res = await userRequest.post("/subcategories", newSubCategory);
      
      if (res.data?.status !== 201) {
        return toast.err("Something went wrong!", { autoClose: 3000 });
      }

      toast.success(res.data?.message, { autoClose: 1500 });

      setTimeout(() => {
        navigate('/subcategories');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch all categories
  useEffect(() => {
    const getAllCategories = async () => {
      const res = await publicRequest.get('/categories/all');
      res.data && setCategories(res.data);
    }
    getAllCategories();
  }, []);


  return (
    <div className='newSubCategory'>
      <div className="top">
        <h1>ADD NEW SUB CATEGORY</h1>
      </div>
      <div className="bottom">
        <form>
          <div className="formInput">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="t-shirt"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="formInput">
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
          <button className="submit" onClick={handleSubmit}>Create</button>
        </form>
      </div>
    </div>
  )
}

export default NewUser;

