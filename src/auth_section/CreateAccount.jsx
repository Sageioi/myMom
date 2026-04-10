import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";


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
      <span className="text-purple-400 text-sm">User already exist. Try again</span>
    </div>
  )
}

const Button = ({handleLogin}) => {
 
  return (
   <button className = {"bg-white font-medium border-2 border-purple-400 text-purple-400 p-1 rounded-md"} onClick={() => handleLogin()}
 >Submit</button>
  )
}


const CreateAccount = () => {
  const isMobile = useMediaQuery({ maxWidth: 375 });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [debouncedEmail, setDebouncedEmail] = useState('');
  const [debouncedPass, setDebouncedPass] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [userStatus, setUserStatus] = useState('')
  const [unable, setUnable] = useState(false)




   
const handleLogin = async () => {
    setLoading(true);
    
    const bodyData = {
      email: debouncedEmail,
      password: debouncedPass,
      is_active: true,
      is_superuser: false,
      is_verified: false
    };

    try {
      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method:"POST",
          headers : {"Content-Type":"application/json",
          },
          body : JSON.stringify(bodyData),
        }
      )
      const data = await response.json()
      console.log(data)
      if (response.status == 201 ) {
        navigate("/login")
      }
      else{
         setUserStatus(<LoginError/>)
      }

    } catch (error) {
      console.error("Check your Internet Connection or this error message:", error.message);
      setUnable(true)
      setUserStatus(<RenderError/>)
    } finally {
      setLoading(false);
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
        <div className="flex justify-center items-center font-medium"><span className="top text-purple-400">Create Account</span></div>
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
        <div className="h-5 flex justify-center items-center">
        {userStatus}
        </div>
        <div className="flex justify-center items-center p-5">
          <Button handleLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
}


export default CreateAccount;