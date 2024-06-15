import React from 'react';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';


export default function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const [Email, setEmail] = useState("");
    const [Password1, setPassword1] = useState("");
    const [Password2, setPassword2] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const normalLogin = async () => {
      if (Password1 !== Password2) {
        return toast.error('Invalid confirm password!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/signup", {
        method: "post",
        body: JSON.stringify({ Name: name, Password: Password1, Email: Email }),
        headers: { 'content-type': 'application/json' }
      });
      response = await response.json();
      console.log(response);
      if (response.success === 1) {
        return toast.success(response.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      if (response.success === 0) {
        return toast.error(response.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      Cookies.set('user', JSON.stringify(response.user));
      Cookies.set('jwtoken', response.jwtoken, { expires: 7, secure: false });
      navigate('/');
  
    }
  
    async function handleGoogleLoginSuccess(tokenResponse) {
      const accessToken = tokenResponse.access_token;
      console.log(accessToken);
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/signup", {
        method: "post",
        body: JSON.stringify({ googleAccessToken: accessToken }),
        headers: { 'content-type': 'application/json' }
      });
      response = await response.json();
      console.log(response);
  
      Cookies.set('user', JSON.stringify(response.user));
      Cookies.set('jwtoken', response.jwtoken, { expires: 7, secure: false });
      navigate('/');
  
    }
  
    const googleLogin = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  return (
    <div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password1">Password:</label>
        <input
          type="password"
          id="password1"
          value={Password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password2">Confirm Password:</label>
        <input
          type="password"
          id="password2"
          value={Password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
      </div>
      <button onClick={normalLogin}>Register</button>
      <button onClick={() => googleLogin()}>Signup via google</button>
      <ToastContainer/>
    </div>
  )
}
