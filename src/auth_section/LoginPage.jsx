import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {Link} from "react-router-dom"
import axios from "axios"


const InputField = ({ label, value, onChange, isMobile }) =>{
return (
  <li className={isMobile ? "flex flex-col" : "grid grid-cols-2 gap-4"}>
    <span className="text-purple-400">{label}</span>
    <input
      className="border-2 rounded-md focus:outline-purple-400 text-purple-400 p-1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </li>
)};

const Button = ({handleLogin}) => {
 
  return (
   <button className = {"bg-purple-400 font-medium text-white p-1 rounded-md"} onClick={() => handleLogin()}
 >Submit</button>
  )
}

const Login =  () => {
  const isMobile = useMediaQuery({ maxWidth: 320 });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [debouncedEmail, setDebouncedEmail] = useState('');
  const [debouncedPass, setDebouncedPass] = useState('');
  const [loading, setLoading] = useState(false);

  console.log("Email:", debouncedEmail, "Password:", debouncedPass);

   
const handleLogin = async () => {
    setLoading(true);
    
    const bodyData = new URLSearchParams();
    bodyData.append("username", debouncedEmail);
    bodyData.append("password", debouncedPass);

    try {
      const response = await axios({url:`http://127.0.0.1:8000/auth/jwt/login`,
        method:"post",
        headers : {"Content-Type":"application/x-www-form-urlencoded"},
        data: bodyData,
        timeout: 7000,
        withCredentials: true
      })

      if (response.status == 204 ) {
        console.log(response)
        alert("You have been logged in.")
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Check your Internet Connection or this error message:", error.message);
    } finally {
      setLoading(!loading);
    }
  };
  
 useEffect(
  () => {
    const handler = setTimeout(() => {
      setDebouncedEmail(email);
      setDebouncedPass(password);
    },500
    )
    return () => {
      clearTimeout(handler)
    }

  },[email,password]
 )
  return (
    <div className="bg-purple-400 h-screen w-screen flex justify-center items-center">
      <div className={`bg-white rounded-md shadow-2xl  p-6 ${isMobile ? "w-64 h-70" : "w-96 h-70 "}`}>
        <div className="flex justify-center items-center font-medium"><span className="top  text-purple-400">Login to your account</span></div>
        <ul className="space-y-4 font-medium m-3">
          <InputField 
            label="Email" 
            value={email} 
            onChange={setEmail} 
            isMobile={isMobile} 
          />
          <InputField 
            label="Password" 
            value={password} 
            onChange={setPassword} 
            isMobile={isMobile} 
          />
        </ul>
        <div className="flex flex-col justify-center items-center p-5 space-y-4">
          <Button handleLogin={handleLogin} />
          <Link to = "/create_account">
          <button className="bg-purple-400 text-white p-1 rounded-md flex font-medium">Create Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
  
};



export default Login;