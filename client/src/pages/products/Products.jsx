import { useEffect, useState } from "react";
import "./products.scss";
import { useParams } from "react-router-dom";
import List from "../../components/list/List";
import useFetch from "../../hooks/useFetch";
const defaultCatImg = "https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600";

const Products = () => {
  const { category } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState("asc");
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [catImg, setCatImg] = useState("");

  const { data: singleCat} = useFetch(`/categories/single?cat=${category}`);

  const { 
    data, loading: categoryLoading, error: categoryError 
  } = useFetch(
    `/subcategories/all?category=${category}`
  );

  // set cat img
  useEffect(() => {
    singleCat && setCatImg(singleCat?.img);
  }, [singleCat]);

  // set product data
  useEffect(() => {
    setLoading(categoryLoading);
    setSubCategories(data);
    setError(categoryError);
  }, [data, categoryError, categoryLoading]);

  // handle sub categories
  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter(item => item !== value)
    );
  };

  return (
    <div className="products">
      {
        loading ? (
          "Please wait..."
        ) : error ? (
          "Something went wrong"
        ) : (
          <div className="left">
            <div className="filterItem">
              <h2>Product Categories</h2>
              {
                subCategories && subCategories.map(item => (
                  <div className="inputItem" key={item?._id}>
                    <input
                      type="checkbox"
                      id={item?._id}
                      value={item?.title}
                      onChange={handleChange}
                    />
                    <label htmlFor={item?._id}>{item?.title}</label>
                  </div>
                ))
              }
            </div>
            <div className="filterItem">
              <h2>Filter by price</h2>
              <div className="inputItem">
                <span>0</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <span>{maxPrice}</span>
              </div>
            </div>
            <div className="filterItem">
              <h2>Sort by</h2>
              <div className="inputItem">
                <input
                  type="radio"
                  id="asc"
                  value="asc"
                  name="price"
                  onChange={(e) => setSort("asc")}
                />
                <label htmlFor="asc">Price (Lowest first)</label>
              </div>
              <div className="inputItem">
                <input
                  type="radio"
                  id="desc"
                  value="desc"
                  name="price"
                  onChange={(e) => setSort("desc")}
                />
                <label htmlFor="desc">Price (Highest first)</label>
              </div>
            </div>
          </div>
        )
      }
      <div className="right">
        <img
          className="catImg"
          src={catImg || defaultCatImg}
          alt=""
        />
        <List category={category} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats} />
      </div>
    </div>
  );
};

export default Products;