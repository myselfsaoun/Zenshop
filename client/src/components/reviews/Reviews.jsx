import React, { useEffect, useState } from 'react'
import Review from '../review/Review';
import './reviews.scss';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userRequest } from '../../utils/makeRequest';

const Reviews = ({ productId }) => {
    const user = useSelector(state => state.user?.currentUser?.user);
    const [review, setReview] = useState({ desc: "", star: "" });
    const [reviews, setReviews] = useState([]);
    const [orderedProducts, setOrderedProducts] = useState([]);

    // fetch product review
    const { data, loading, error } = useFetch(`/reviews/${productId}`);

    const handleChange = (e) => {
        setReview(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    // submit review
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            productId,
            ...review
        };

        setReview(prev => (
            {
                ...prev,
                desc: "",
                star: ""
            }
        ))

        if (!user) {
            return toast.warn("First login your account", { autoClose: 3000 });
        }

        const isAvailable = orderedProducts.includes(productId);

        if (!isAvailable) {
            return toast.warn("First buy this product", { autoClose: 3000 });
        }

        try {
            const res = await userRequest.post('/reviews', newReview);
            res.data && setReviews(prev => (
                [res?.data.review, ...prev]
            ));

            toast.success(res?.data.message, { autoClose: 3000 });
        } catch (err) {
            const res = err?.response?.data;
            if (res.status === 422 || res.status === 404) {
                return toast.warn(res.message, { autoClose: 3000 });
            }
        }
    }

    useEffect(() => {
        data && setReviews(data);
    }, [data]);

    // get all ordered products
    useEffect(() => {
        const getUserOrders = async () => {
            const res = await userRequest.get(`/orders/single/${user?._id}`);

            const pId = res?.data.flatMap(order => order.products.map(p => p.productId));
            setOrderedProducts(pId);
        }
        getUserOrders();
    }, [user?._id]);


    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {
                loading
                    ? "loading..."
                    : error
                        ? "something went wrong!"
                        : (
                            reviews.length ?
                                reviews.map(r => (
                                    <Review review={r} key={r?._id} />
                                )) : (
                                    <span className='noReview'>No review found!!</span>
                                )
                        )
            }

            <div className="add">
                <h3>Add a review</h3>
                <form className="addForm">
                    <input
                        type="text"
                        name="desc"
                        value={review.desc}
                        placeholder='write your opinion'
                        onChange={handleChange}
                    />
                    <select name="star" id="star" onChange={handleChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button onClick={handleSubmit}>Send</button>
                </form>
            </div>

            <div className="hr"></div>

        </div>
    )
}

export default Reviews;