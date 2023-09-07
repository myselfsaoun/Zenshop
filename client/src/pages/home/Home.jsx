import React, { useEffect } from 'react'
import "./home.scss";
import Categories from '../../components/categories/Categories'
import Widget from '../../components/widget/Widget'
import FeaturedProducts from '../../components/featuredProducts/FeaturedProducts'
import Slider from '../../components/slider/Slider'
import { useLocation } from 'react-router-dom';
const featured = "Featured products on e-commerce platforms are typically items that the platform highlights or promotes to attract the attention of potential customers. These products are often selected based on their popularity, uniqueness, or current trends.";
const trending = "Trending products are items that are currently popular and in high demand among consumers. These products often reflect current market trends, customer preferences, and cultural influences.";

const Home = () => {
    const location = useLocation();
    const refresh = location.state?.refresh;

    useEffect(() => {
        if(refresh) {
            console.log("Refreshed!!");
            const hasRefreshed = localStorage.getItem('hasRefreshed');
    
            if (!hasRefreshed) {
                localStorage.setItem('hasRefreshed', 'true');
                window.location.reload();
            }
        }
    }, [refresh]);

    return (
        <div className='home'>
            <Slider />
            <FeaturedProducts type="featured" state={featured} />
            <Categories />
            <FeaturedProducts type="trending" state={trending} />
            <Widget />
        </div>
    )
}

export default Home;