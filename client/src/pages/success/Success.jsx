import React, { useEffect } from 'react';
import './success.scss';
import { useDispatch, useSelector } from 'react-redux';
import { userRequest } from '../../utils/makeRequest';
import { resetCart } from '../../redux/cartReducer';
import { Link } from "react-router-dom";

// demo order
let order = {
  userId: "",
  products: [],
  amount: 0,
  stripeId: ""
};

const Success = () => {
  const { user, cart } = useSelector(state => state);
  const dispatch = useDispatch();

  // set total price
  const totalPrice = () => {
    let total = 0;
    cart.products.forEach(item => {
      total += (item.quantity * item.price);
    });
    return total.toFixed(2);
  };

  order.userId = user?.currentUser?.user?._id;
  order.amount = totalPrice();
  order.stripeId = JSON.parse(localStorage.getItem("stripeId"));

  // insert products into order
  cart?.products.map(p => order.products.push(
    {
      productId: p?.id,
      title: p?.title,
      desc: p?.desc,
      quantity: p?.quantity,
      price: p?.price
    }
  ));

  // create order
  useEffect(() => {
    const orderCreate = async () => {
      await userRequest.post('/orders', { order });

      dispatch(resetCart());
      localStorage.removeItem("stripeId");
    }
    orderCreate();
  }, []);


  return (
    <div className='success'>
      <h1>Payment Succeeded</h1>
      <Link
        to="/"
        style={{ textDecoration: "none" }}
      >
        <span>Back To Home Page</span>
      </Link>
    </div>
  )
}

export default Success;