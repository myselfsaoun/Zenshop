import React from "react";
import "./footer.scss";
import paymentImage from "../../assets/payment.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="top">
                <div className="item">
                    <h1>Categories</h1>
                    <span>Women</span>
                    <span>Men</span>
                    <span>Shoes</span>
                    <span>Accessories</span>
                    <span>New Arrivals</span>
                </div>
                <div className="item">
                    <h1>Links</h1>
                    <span>FAQ</span>
                    <span>Pages</span>
                    <span>Stores</span>
                    <span>Compare</span>
                    <span>Cookies</span>
                </div>
                <div className="item">
                    <h1>About</h1>
                    <span>
                        Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
                        amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
                        ut labore etdolore.
                    </span>
                </div>
                <div className="item">
                    <h1>Contact</h1>
                    <span>
                        Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
                        amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
                        ut labore etdolore.
                    </span>
                </div>
            </div>
            <div className="bottom">
                <div className="left">
                    <div className="logo">
                        <Link to="/" className="link">
                            <span>ZenShop</span>
                        </Link>
                    </div>
                    <span className="copyright">
                        © Copyright reserved by Golam Mostafa
                    </span>
                </div>
                <div className="right">
                    <img src={paymentImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Footer;