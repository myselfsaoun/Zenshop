import "./order.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../../utils/makeRequest";
import OrderCard from "../../components/orderCard/OrderCard";


const User = () => {
  const orderId = useParams().orderId;
  const [order, setOrder] = useState({});
  const [productQuantity, setProductQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // fetch single order
  useEffect(() => {
    const getOrder = async () => {
      setLoading(true);
      let quan = 0;

      try {
        const res = await userRequest.get(`/orders/find/${orderId}`);
        res && setOrder(res.data);
        
        res.data && res.data.products.forEach(p => quan += parseInt(p.quantity));
        setProductQuantity(quan);

        setLoading(false);
        setError(false);
      } catch (err) {
        setError(true);
        console.log(err);
      }
    }
    getOrder();
  }, [orderId]);


  return (
    <div className="order">
      {
        loading ? (
          "Please wait..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          order && (
            <>
              <div className="orderTitleContainer">
                <h1 className="orderTitle">Order</h1>
              </div>
              <div className="orderTop">
                <div className="orderInfoItem">
                  <span className="orderInfoKey">Stripe Id:</span>
                  <span className="orderInfoValue">{order?.stripeId}</span>
                </div>
                <div className="orderInfoItem">
                  <span className="orderInfoKey">Order Id:</span>
                  <span className="orderInfoValue">{order?._id}</span>
                </div>
                <div className="orderInfoItem">
                  <span className="orderInfoKey">User Id:</span>
                  <span className="orderInfoValue">{order?.userId}</span>
                </div>
                <div className="orderInfoItem">
                  <span className="orderInfoKey">Product Item:</span>
                  <span className="orderInfoValue">
                    {order?.products?.length}
                  </span>
                </div>
                <div className="orderInfoItem">
                  <span className="orderInfoKey">Product Quantity:</span>
                  <span className="orderInfoValue">
                    {productQuantity}
                  </span>
                </div>
                <div className="orderInfoItem">
                  <span className="orderInfoKey">Total Amount:</span>
                  <span className="orderInfoValue">
                    ${order.amount}
                  </span>
                </div>
                <div className="orderInfoItem">
                  <span className="orderInfoKey">Status:</span>
                  <span className="orderInfoValue">
                    {order?.status}
                  </span>
                </div>
              </div>
              <div className="orderedProductTitleContainer">
                <h2 className="orderedProductTitle">Ordered Products</h2>
              </div>
              <div className="orderBottom">
                {
                  order && order.products?.map((item, i) => (
                    <OrderCard product={item} key={i} index={i}/>
                  ))
                }
              </div>
            </>
          )
        )
      }
    </div>
  );
}

export default User;