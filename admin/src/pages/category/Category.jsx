import { useParams } from "react-router-dom";
import "./category.scss";
import { useState, useEffect } from "react";
import { publicRequest } from "../../utils/makeRequest";
import CategoryUpdate from "../../components/categoryUpdate/CategoryUpdate";


const Category = () => {
    const categoryId = useParams().categoryId;
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // fetch single category
    useEffect(() => {
        const getCategory = async () => {
            setLoading(true);
            try {
                const res = await publicRequest.get(`/categories/single/${categoryId}`);
                res && setCategory(res.data);

                setLoading(false);
                setError(false);
            } catch (err) {
                console.log(err.message);
                setError(true);
            }
        }
        getCategory();
    }, [categoryId]);

    return (
        <div className="category">
            {
                loading ? (
                    "Loading..."
                ) : error ? (
                    "Something went wrong!"
                ) : (
                    <>
                        <div className="categoryTitleContainer">
                            <h1 className="categoryTitle">Category</h1>
                        </div>
                        <div className="categoryTop">
                            <div className="categoryInfoTop">
                                <img src={category?.img} alt="" className="categoryInfoImg" />
                                <span className="categoryName">{category?.title}</span>
                            </div>
                            <div className="categoryInfoBottom">
                                <div className="categoryInfoItem">
                                    <span className="categoryInfoKey">Id:</span>
                                    <span className="categoryInfoValue">{category?._id}</span>
                                </div>
                                <div className="categoryInfoItem">
                                    <span className="categoryInfoKey">Title:</span>
                                    <span className="categoryInfoValue">{category?.title}</span>
                                </div>
                                <div className="categoryInfoItem">
                                    <span className="categoryInfoKey">Description:</span>
                                    <span className="categoryInfoValue">${category?.desc}</span>
                                </div>
                            </div>
                        </div>
                        <div className="categoryBottom">
                            <CategoryUpdate category={category} />
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Category;