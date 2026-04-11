import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"


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
 >Request for token</button>
  )
}

const Forget_Page = () => {
    const isMobile = useMediaQuery({ maxWidth: 375 });
    const [email, setEmail] = useState('');
    const [debouncedEmail, setDebouncedEmail] = useState('');

    useEffect (
        () => {
            const handler = setTimeout(() => {
                setDebouncedEmail(email)},
                [500]
            )
            return () => {clearTimeout(handler)}
        },[email]
    )
    const handleForgot = async () => {
    const bodyData = {
      "email" : debouncedEmail
    }

    try {
      const response = await fetch(
        `${API_URL}/auth/forget-password`,
        {
          method:"POST",
          headers : {"Content-Type":"application/json"},
          body : bodyData,
        }
      )
      const data = await response.json()
      if (response.status == 202 ) {
        navigate("/verify_page")
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
                  <div className={`bg-white rounded-md shadow-2xl  p-6 ${isMobile ? "w-64 h-50" : "w-96 h-60 "}`}>
                    <div className="flex justify-center items-center font-medium"><span className="top  text-purple-400">Login to your account</span></div>
                    <ul className="space-y-4 font-medium m-3">
                      <InputField 
                        label="Email" 
                        value={email} 
                        onChange={setEmail} 
                        isMobile={isMobile} 
                      />
                    </ul>
                    <div className={`flex flex-col justify-center items-center ${isMobile ? 'p-1':'p-3'} space-y-4`}>
                      <Button handleLogin={handleForgot} />
                    </div>
                  </div>
                </div>
        </div>
    )
}

export default Forget_Page;