import React, { useState } from 'react'
// import { publicRequest } from '../../utils/request';

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);

  const sendLink = (e) => {
    e.preventDefault();

    console.log(email);
  }

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Your Email</h1>
          </div>
          {
            message &&
            <p style={{ color: "green", fontWeight: "bold" }}>
              Pasword reset link send succsfully in your Email
            </p>
          }
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email" value={email}
                name="email" id="email"
                placeholder='Enter Your Email Address'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className='btn' onClick={sendLink}>Send</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default PasswordReset;