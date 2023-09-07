import React, { useState } from "react";
import "./product.scss";
import {
  AddShoppingCart, FavoriteBorder, Balance
} from "@mui/icons-material";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { toast } from 'react-toastify';
import Reviews from '../../components/reviews/Reviews';

const Product = ({ user }) => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);
  const { products } = useSelector(state => state?.cart);
  const dispatch = useDispatch();

  const { data, loading, error } = useFetch(`/products/single/${id}`);

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
        toast.warn("You select too more product", { autoClose: 3000 });
      } else {
        dispatch(addToCart(cartProduct));
        toast.success("Product added successfully", { autoClose: 3000 });
      }
    } else {
      toast.warn("First login your account", { autoClose: 3000 });
    }
  }

  return (
    <div className="product">
      {
        loading ? (
          "Please wait..."
        ) : error ? (
          "Something went wrong"
        ) : (
          <>
            <div className="left">
              <div className="leftWrapper">
                <div className="images">
                  <img
                    src={data?.img}
                    alt=""
                    onClick={() => setSelectedImg("img")}
                  />
                  <img
                    src={data?.img2}
                    alt=""
                    onClick={() => setSelectedImg("img2")}
                  />
                  {/* <img
                    src={data?.img3}
                    alt=""
                    onClick={() => setSelectedImg("img3")}
                  /> */}
                </div>
                <div className="mainImg">
                  <img
                    src={data && data[selectedImg]}
                    alt=""
                  />
                </div>
              </div>
              <div className="reviews">
                <Reviews productId={id} />
              </div>
            </div>
            <div className="right">
              <h1 className="title">{data?.title}</h1>
              <span className="price">${data?.price}</span>
              <p>{data?.desc}</p>
              <div className="quantity">
                <button
                  onClick={() =>
                    setQuantity(prev => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  -
                </button>
                {quantity}
                <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
              </div>
              <div className="availableProduct">
                Product Available - <span>{data?.availableProduct}</span>
              </div>
              <button
                className="add"
                onClick={() => handleCart({
                  id: data._id,
                  title: data.title,
                  desc: data.desc,
                  img: data.img,
                  quantity,
                  price: data.price,
                  availability: data.availableProduct
                })
                }
              >
                <AddShoppingCart /> ADD TO CART
              </button>
              <div className="links">
                <div className="item">
                  <FavoriteBorder /> ADD TO WISH LIST
                </div>
                <div className="item">
                  <Balance /> ADD TO COMPARE
                </div>
              </div>
              {/* <div className="info">
                <span>Vendor: Polo</span>
                <span>Product Type: T-Shirt</span>
                <span>Tag: T-Shirt, Women, Top</span>
              </div>
              <hr />
              <div className="info">
                <span>DESCRIPTION</span>
                <hr />
                <span>ADDITIONAL INFORMATION</span>
                <hr />
                <span>FAQ</span>
              </div> */}
            </div>
          </>
        )
      }
    </div >
  );
};


export default Product;