import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const navigate=useNavigate()
    async function handleGoogleLoginSuccess(tokenResponse) {
        const accessToken = tokenResponse.access_token;
        console.log(accessToken);
        let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/login", {
          method: "post",
          body: JSON.stringify({ googleAccessToken: accessToken }),
          headers: { 'content-type': 'application/json' }
        });
        response = await response.json();
        console.log(response);
        if (response.success === 1) {
          Cookies.set('jwtoken', response.jwtoken, { expires: 7, secure: false });
          console.log(JSON.stringify(response.user));
          Cookies.set('user', JSON.stringify(response.user), { expires: 7, secure: false });
    
          navigate('/');
        }
        else {
          toast.error(response.message, {
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
      }
    
      const handleClick = async () => {
    
        let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/login", {
          method: "post",
          body: JSON.stringify({ email: Email, password: Password }),
          headers: { 'content-type': 'application/json' }
        });
        response = await response.json();
        console.log(response);
        if (response.success === 1) {
          Cookies.set('jwtoken', response.jwtoken, { expires: 7, secure: false });
          console.log(JSON.stringify(response.user));
          Cookies.set('user', JSON.stringify(response.user));
          navigate('/');
        }
        else {
          toast.error(response.message, {
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
      };
      const googleLogin = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  return (

    <div>
      <input placeholder='Email' type='email' onChange={(e)=>setEmail(e.target.value)} value={Email}/>
      <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} value={Password}/>
      <button onClick={handleClick}> Submit</button>
      <button onClick={() => googleLogin()}>Login via google</button>
      <ToastContainer />
    </div>
  )
}
