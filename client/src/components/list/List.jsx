import React from "react";
import "./list.scss";
import Card from "../card/Card";
import useFetch from "../../hooks/useFetch";


const List = ({ subCats, maxPrice, sort, category }) => {
    const { data, loading, error } = useFetch(
        `/products/all?category=${category}${subCats.map(
            item => `&subCat=${item}`
        )}&maxPrice=${maxPrice}&sort=${sort}`
    );

    return (
        <div className="lists">
            {
                loading ? (
                    "Please wait..."
                ) : error ? (
                    "Something went wrong"
                ) : (
                    data?.length ? (
                        <div className="productList">
                            {
                                data?.map(item => <Card item={item} key={item._id} />)
                            }
                        </div>
                    ) : (
                        <h2 className="productNull">
                            No Product Available
                        </h2>
                    )
                )
            }
        </div>
    );
};

export default List;