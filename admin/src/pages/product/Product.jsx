import { useParams } from "react-router-dom";
import "./product.scss";
// import Chart from "../../components/lineChart/LineChart";
import { useState, useEffect, useMemo } from "react";
import { userRequest } from "../../utils/makeRequest";
import ProductUpdate from "../../components/productUpdate/ProductUpdate";


const Product = () => {
    const [pStats, setPStats] = useState([]);
    const productId = useParams().productId;
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // fetch single product
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const res = await userRequest.get(`/products/single/${productId}`);
                res && setProduct(res.data);

                setLoading(false);
                setError(false);
            } catch (err) {
                console.log(err.message);
                setError(true);
            }
        }
        getProduct();
    }, [productId]);

    // const MONTHS = useMemo(() => (
    //     [
    //         "Jan",
    //         "Feb",
    //         "Mar",
    //         "Apr",
    //         "May",
    //         "Jun",
    //         "Jul",
    //         "Aug",
    //         "Sep",
    //         "Oct",
    //         "Nov",
    //         "Dec"
    //     ]
    // ), []);

    // // set product stats
    // useEffect(() => {
    //     const getStats = async () => {
    //         try {
    //             const res = await userRequest.get("/orders/income?pid=" + productId);
    //             const list = res.data.sort((a, b) => {
    //                 return (
    //                     a._id - b._id
    //                 )
    //             });
    //             list.map(item =>
    //                 setPStats(prev => [
    //                     ...prev,
    //                     { name: MONTHS[item._id - 1], Sales: item.total }
    //                 ])
    //             );
    //         } catch (err) {
    //             console.log(err.message);
    //         }
    //     }
    //     getStats();
    // }, [productId, MONTHS]);


    return (
        <div className="product">
            {
                loading ? (
                    "Loading..."
                ) : error ? (
                    "Something went wrong!"
                ) : (
                    <>
                        <div className="productTitleContainer">
                            <h2 className="productTitle">Product</h2>
                        </div>
                        <div className="productTop">
                            {/* <div className="productTopLeft">
                                <Chart
                                    data={pStats}
                                    title="Sales Performance"
                                    dataKey="Sales"
                                />
                            </div> */}
                            <div className="productTopRight">
                                <div className="productInfoTop">
                                    <img src={product?.img} alt="" className="productInfoImg" />
                                    <span className="productName">{product?.title}</span>
                                </div>
                                <div className="productInfoBottom">
                                    <div className="productInfoItem">
                                        <span className="productInfoKey">Id:</span>
                                        <span className="productInfoValue">{product?._id}</span>
                                    </div>
                                    <div className="productInfoItem">
                                        <span className="productInfoKey">Sales:</span>
                                        <span className="productInfoValue">${product?.price}</span>
                                    </div>
                                    <div className="productInfoItem">
                                        <span className="productInfoKey">In stock:</span>
                                        <span className="productInfoValue">
                                            {product?.inStock ? "Stocked" : "Out of stock"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="productBottom">
                            <ProductUpdate product={product} />
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Product;