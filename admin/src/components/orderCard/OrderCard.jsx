import React from 'react';
import './orderCard.scss';

const OrderCard = ({ product, index }) => {

    return (
        <div className='orderCard'>
            <h3 className="cardTitle">Product Item: {index+1}</h3>
            <div className="cardoItem">
                <span className="cardKey">Product Id:</span>
                <span className="cardValue">{product?.productId}</span>
            </div>
            <div className="cardoItem">
                <span className="cardKey">Title:</span>
                <span className="cardValue">{product?.title}</span>
            </div>
            <div className="cardoItem">
                <span className="cardKey">Description:</span>
                <span className="cardValue">{product?.desc}</span>
            </div>
            <div className="cardoItem">
                <span className="cardKey">Price:</span>
                <span className="cardValue">${product?.price}</span>
            </div>
            <div className="cardoItem">
                <span className="cardKey">Quantity:</span>
                <span className="cardValue">{product?.quantity}</span>
            </div>
        </div>
    )
}

export default OrderCard;