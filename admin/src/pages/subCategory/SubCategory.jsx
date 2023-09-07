import { useParams } from "react-router-dom";
import "./subCategory.scss";
import { useState, useEffect } from "react";
import { publicRequest } from "../../utils/makeRequest";
import SubCategoryUpdate from "../../components/subCategoryUpdate/SubCategoryUpdate";

const Category = () => {
    const subCategoryId = useParams().subCategoryId;
    const [subCategory, setSubCategory] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // fetch single subCategory
    useEffect(() => {
        const getSubCategory = async () => {
            setLoading(true);
            try {
                const res = await publicRequest.get(`/subcategories/single/${subCategoryId}`);
                res && setSubCategory(res.data);

                setLoading(false);
                setError(false);
            } catch (err) {
                console.log(err.message);
                setError(true);
            }
        }
        getSubCategory();
    }, [subCategoryId]);

    return (
        <div className="subCategory">
            {
                loading ? (
                    "Please wait..."
                ) : error ? (
                    "Something went wrong!"
                ) : (
                    <>
                        <div className="subCategoryTitleContainer">
                            <h1 className="subCategoryTitle">Sub Category</h1>
                        </div>
                        <div className="subCategoryTop">
                            <div className="subCategoryInfoTop">
                                <span className="subCategoryName">{subCategory?.title}</span>
                            </div>
                            <div className="subCategoryInfoBottom">
                                <div className="subCategoryInfoItem">
                                    <span className="subCategoryInfoKey">Id:</span>
                                    <span className="subCategoryInfoValue">{subCategory?._id}</span>
                                </div>
                                <div className="subCategoryInfoItem">
                                    <span className="subCategoryInfoKey">Title:</span>
                                    <span className="subCategoryInfoValue">{subCategory?.title}</span>
                                </div>
                                <div className="subCategoryInfoItem">
                                    <span className="subCategoryInfoKey">Categories:</span>
                                    <div className="subCategoryInfoValue">
                                        {
                                            subCategory?.categories?.map(cat => (
                                                <span>{cat}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="subCategoryBottom">
                            <SubCategoryUpdate subCategory={subCategory} />
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Category;