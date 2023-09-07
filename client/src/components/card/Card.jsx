import React from "react";
import "./card.scss";
import { Link } from "react-router-dom";
import { AddShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { toast } from 'react-toastify';


const Card = ({ item }) => {
    const user = useSelector(state => state.user?.currentUser?.user);
    const products = useSelector(state => state?.cart?.products);
    const dispatch = useDispatch();

    // product add to cart
    const handleCart = (cartProduct) => {
        // console.log(cartProduct);

        if (user) {
            let totalProduct = cartProduct.quantity;

            if (products.length) {
                const product = products.find(p => p.id === cartProduct.id);
                if (product) { totalProduct += product.quantity };
            }

            if (totalProduct > cartProduct.availability) {
                toast.warn("You select too more product", {autoClose: 3000});
            } else {
                dispatch(addToCart(cartProduct));
                toast.success("Product added successfully", {autoClose: 3000});
            }
        } else {
            toast.warn("First login your account", {autoClose: 3000});
        }
    }

    return (
        <div className="card">
            <Link
                className="link"
                to={`/product/${item?._id}`}
            >
                <div className="cardWrapper">
                    <div className="image">
                        {item?.isUpdated && <span>New Season</span>}
                        <img
                            src={item.img}
                            alt=""
                            className="mainImg"
                        />
                        <img
                            src={item.img2}
                            alt=""
                            className="secondImg"
                        />
                    </div>
                    <h2>{item?.title}</h2>
                    <div className="prices">
                        <h3>${item?.oldPrice || item?.price + 20}</h3>
                        <h3>${item?.price}</h3>
                    </div>
                </div>
            </Link>
            <button
                className="add"
                onClick={() => handleCart({
                    id: item._id,
                    title: item.title,
                    desc: item.desc,
                    img: item.img,
                    quantity: 1,
                    price: item.price,
                    availability: item.availableProduct
                })
                }
            >
                <AddShoppingCart /> ADD TO CART
            </button>
        </div>
    );
};

export default Card;