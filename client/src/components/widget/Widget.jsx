import React, { useState } from "react";
import "./widget.scss";
import {
    Facebook, Instagram, Twitter, Google, Pinterest
} from "@mui/icons-material";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { sendMail } from '../../redux/apiCalls';

const Widget = () => {
    const [mail, setMail] = useState("");
    const user = useSelector(state => state.user?.currentUser?.user);

    const handleMail = async (e) => {
        e.preventDefault();

        if (!user) {
            return toast.warn("First login your account!", { autoClose: 3000 });
        }

        const mailInfo = {
            username: user?.username,
            email: user?.email,
            phone: user?.phone ? user?.phone : "",
            message: mail,
        }

        const res = await sendMail(mailInfo);
        setMail("");

        if (res.status === 422) {
            return toast.warn(res.message, { autoClose: 3000 });
        }

        if (res.status === 401) {
            return toast.error("Mail not sent!", { autoClose: 3000 });
        }

        toast.success(res.message, { autoClose: 2000 });
    };

    return (
        <div className="widget">
            <div className="wrapper">
                <span>BE IN TOUCH WITH US:</span>
                <div className="mail">
                    <input type="email" value={mail}
                        placeholder="Enter your email..."
                        onChange={(e) => setMail(e.target.value)}
                    />
                    <button onClick={handleMail}>JOIN US</button>
                </div>
                <div className="icons">
                    <Facebook />
                    <Instagram />
                    <Twitter />
                    <Google />
                    <Pinterest />
                </div>
            </div>
        </div>
    );
};

export default Widget;