import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"


const API_URL = import.meta.env.VITE_API_URL
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
   <button className = {"bg-white font-medium border-2 border-purple text-purple-400 p-1 rounded-md"} onClick={() => handleLogin()}
 >Confirm token</button>
  )
}

const RenderError = () => {
  return (
    <div>
      <span className="text-purple-400 text-sm">Something went wrong. Try again.</span>
    </div>
  )
}

const LoginError = () => {
  return (
    <div>
      <span className="text-purple-400 text-sm">You brought in the wrong credentials</span>
    </div>
  )
}


const Verify_Page = () => {
    const isMobile = useMediaQuery({ maxWidth: 375 });
    const [token, setToken] = useState('');
    const [debouncedToken, setDebouncedToken] = useState('');
    const [password, setPassword] = useState('');
    const [debouncedPassword, setDebouncedPassword] = useState('');
    const [userStatus , setUserStatus] = useState('')
    const navigate = useNavigate()

    useEffect (
        () => {
            const handler = setTimeout(() => {
                setDebouncedToken(token),
                setDebouncedPassword(password)},
                [500]
            )
            return () => {clearTimeout(handler)}
        },[token,password]
    )
    const handleVerify = async () => {
    const bodyData = {
      "token" : debouncedToken,
      "password" : debouncedPassword
    }

    try {
      const response = await fetch(
        `${API_URL}/auth/reset-password`,
        {
          method:"POST",
          headers : {"Content-Type":"application/json"},
          body : JSON.stringify(bodyData),
        }
      )
      const data = await response.json()
      console.log(data)
      if (response.status == 200 ) {
        navigate("/login")
      }
      else {
            setUserStatus(<LoginError/>)
        }
    } catch (error) {
        setUserStatus(<RenderError/>)

    } 
  };
    return (
        <div>
                <div className="bg-purple-400 h-screen w-screen flex justify-center items-center">
                  <div className={`bg-white rounded-md shadow-2xl  p-6 ${isMobile ? "w-64 h-70" : "w-96 h-60 "}`}>
                    <div className="flex justify-center items-center font-medium"><span className="top  text-purple-400">Login to your account</span></div>
                    <ul className="space-y-4 font-medium m-3">
                      <InputField 
                        label="Token" 
                        value={token} 
                        onChange={setToken} 
                        isMobile={isMobile} 
                      />
                        <InputField 
                        label="New Password" 
                        value={password} 
                        onChange={setPassword} 
                        isMobile={isMobile} 
                      />
                    </ul>
                    <div className={`flex flex-col justify-center items-center ${isMobile ? 'p-1':'p-3'} space-y-4`}>
                      <Button handleLogin={handleVerify} />
                    </div>
                  </div>
                </div>
        </div>
    )
}

export default Verify_Page;