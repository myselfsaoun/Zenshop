import React from "react";
import "./cart.scss";
import { 
    DeleteOutlined, AddCircle, 
    RemoveCircle, RestartAlt
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { 
    removeItem, resetCart, updateCart 
} from "../../redux/cartReducer";
import { userRequest } from "../../utils/makeRequest";
import { toast } from 'react-toastify';

import { loadStripe } from "@stripe/stripe-js";
const STRIPE_PUBLIC_KEY = "pk_test_51MvhhMKIZlg7N7Rai7FYprIdGyE2J2VPc4ALqze3MjbU4t03EN6J57he9SxlyjLodPHmUYOdgr8bCFrgFPGC7zoU00qND6hNuM";


const Cart = () => {
    const user = useSelector(state => state.user?.currentUser?.user);
    const { products } = useSelector(state => state?.cart);
    const dispatch = useDispatch();

    const baseUrl = window.location.origin.toString();

    // handle product quantity
    const handleProductQuantity = (product, action) => {
        if(action === 'increase') {
            if(product.quantity < product.availability) {
                const updatedProduct = {...product, quantity: product.quantity+1}
                dispatch(updateCart({product: updatedProduct}));
            }
        }
        if(action === 'decrease') {
            if(product.quantity > 1) {
                const updatedProduct = {...product, quantity: product.quantity-1}
                dispatch(updateCart({product: updatedProduct}));
            } 
        }
    };

    // set total price
    const totalPrice = () => {
        let total = 0;
        products.forEach((item) => {
            total += item.quantity * item.price;
        });
        return total.toFixed(2);
    };

    const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

    const handlePayment = async () => {
        if (products.length <= 0) {
            return toast.warn("You didn't select any product!!");
        }

        try {
            const stripe = await stripePromise;
            const res = await userRequest.post("/checkout/payment", {
                products,
                baseUrl
            });

            const stripeId = res.data.stripeSession.id;

            // save stripeSession id
            localStorage.setItem(
                "stripeId",
                JSON.stringify(stripeId)
            );

            await stripe.redirectToCheckout({
                sessionId: stripeId,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="cart">
            {
                user ? (
                    <>
                        <h1>Products in your cart</h1>
                        {
                            products && products.map(item => (
                                <div className="item" key={item.id}>
                                    <img src={item.img} alt="" />
                                    <div className="details">
                                        <h1>{item.title}</h1>
                                        <p>{item.desc?.substring(0, 100)}</p>
                                        <div className="price">
                                            {item.quantity} x ${item.price}
                                        </div>
                                    </div>
                                    <div className="cartAction">
                                        <div className="delete">
                                            <DeleteOutlined
                                                className="deleteBtn"
                                                onClick={() => {
                                                    toast("Product removed from cart!", { autoClose: 3000 });
                                                    dispatch(removeItem({ id: item.id }))
                                                }}
                                            />
                                        </div>
                                        <div className="cartControl">
                                            <RemoveCircle
                                                className="controlBtn"
                                                onClick={() => handleProductQuantity(item, 'decrease')}
                                            />
                                            <AddCircle
                                                className="controlBtn"
                                                onClick={() => handleProductQuantity(item, 'increase')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="total">
                            <span>SUBTOTAL</span>
                            <span>${totalPrice()}</span>
                        </div>
                        <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
                        <span 
                            className="reset" 
                            onClick={() => {
                                products.length && toast("Cart reset!", { autoClose: 3000 });
                                dispatch(resetCart());
                            }}
                        >
                            Reset Cart
                            <RestartAlt className="resetBtn"/>
                        </span>
                    </>
                ) : (
                    <>
                        <h1>Products in your cart</h1>
                        <div className="total">
                            <span>SUBTOTAL</span>
                            <span>$0.00</span>
                        </div>
                        <button>PROCEED TO CHECKOUT</button>
                        <span className="reset">
                            <RestartAlt className="resetBtn"/>
                            Reset Cart
                        </span>
                    </>
                )
            }
        </div>
    );
};


export default Cart;