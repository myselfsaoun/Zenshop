import React from 'react'
import './review.scss';
import useFetch from '../../hooks/useFetch';
const DEFAULT_IMG_URL = "https://i.ibb.co/MBtjqXQ/no-avatar.gif";
import Like from '../../assets/like.png';
import Dislike from '../../assets/dislike.png';
import Star from '../../assets/star.png';

const Review = ({ review }) => {
    // fetch review user
    const { 
        data, loading, error 
    } = useFetch(`/users/single/${review?.userId}`);


    return (
        <div className="review">
            {
                loading
                    ? "loading..."
                    : error
                        ? "something went wrong!"
                        : (
                            <div className="reviewUser">
                                <img
                                    className="pp"
                                    src={data?.profilePic || DEFAULT_IMG_URL}
                                    alt=""
                                />
                                <div className="info">
                                    <span className='username'>{data?.username}</span>
                                    <div className="country">
                                        <span>{data?.country || "BD"}</span>
                                    </div>
                                </div>
                            </div>
                        )
            }
            {
                <div className="stars">
                    {
                        review.star && Array(Math.round(review?.star))
                            .fill().map((item, i) => (
                                <img key={i} src={Star} alt="star" />
                            ))
                    }
                    <span>
                        {review?.star}
                    </span>
                </div>
            }
            <p className='desc'>
                {review?.desc}            
            </p>
            <div className="helpful">
                <span>Helpful?</span>
                <img src={Like} alt="" />
                <span>Yes</span>
                <img src={Dislike} alt="" />
                <span>No</span>
            </div>
            <div className="break"></div>
        </div>
    )
}

export default Review;