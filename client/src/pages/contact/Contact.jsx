import React, { useState } from 'react';
import './contact.scss';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { sendContact } from '../../redux/apiCalls';


const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    phone: "",
    message: ""
  });
  const user = useSelector(state => state.user?.currentUser?.user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  };

  const handleContact = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.warn("First login your account!", { autoClose: 3000 });
    }

    const contactInfo = {
      username: contact?.username,
      email: contact?.email,
      phone: contact?.phone,
      message: contact?.message
    }

    const res = await sendContact(contactInfo);

    setContact({
      username: "",
      email: "",
      phone: "",
      message: ""
    });

    if (res.status === 422) {
      return toast.warn(res.message, { autoClose: 3000 });
    }

    if (res.status === 401) {
      return toast.error("Contact not sent!", { autoClose: 3000 });
    }

    if (res.status !== 201) {
      return toast.error("Something went wrong!", { autoClose: 3000 });
    }

    toast.success(res.message, { autoClose: 2000 });
  };

  const handleReset = (e) => {
    e.preventDefault();

    setContact({
      username: "",
      email: "",
      phone: "",
      message: ""
    });

    toast.success("Contact details reset successfully", { autoClose: 2000 });
  }

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Contact Details</h1>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor="username">Username</label>
            <input
              type="text" name="username" id="username"
              value={contact.username}
              placeholder='enter username'
              onChange={handleChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email" name="email" id="email"
              value={contact.email}
              placeholder='enter email'
              onChange={handleChange}

            />
          </div>
          <div className="form_input">
            <label htmlFor="email">Phone</label>
            <input
              type="tel" name="phone" id="phone"
              value={contact.phone}
              placeholder='enter phone number'
              onChange={handleChange}

            />
          </div>
          <div className="form_input">
            <label htmlFor="email">Message</label>
            <textarea
              name="message" id="message"
              cols="30" rows="10"
              placeholder='Write something...'
              value={contact.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="button">
            <button className='btn' onClick={handleReset}>
              Reset
            </button>
            <button className='btn' onClick={handleContact}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact;