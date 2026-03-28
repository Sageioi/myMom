import { useState,useEffect } from 'react'
import { useMediaQuery } from "react-responsive";

const Create_Task = () => {
    const isMobile = useMediaQuery({ maxWidth: 320 });
    return (
        <div className= {`bg-purple-400 flex h-screen w-full  justify-center items-center`}>
            <div className={`${isMobile ? "w-60 h-40" : "w-90 h-80" } rounded-t-lg  bg-white`}>
                 <div className={`${isMobile ? "w-60 h-10":"w-90 h-15"} bg-white rounded-t-lg  border-b-2 border-purple-400`}>
                 </div>
            </div>
        </div>
    )
    
}

export default Create_Task; 
