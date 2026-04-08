import { useState,useEffect,useRef } from 'react'
import { useMediaQuery } from "react-responsive";
import notepad from '../assets/notepad-svgrepo-com.svg'
import add from '../assets/add-circle-svgrepo-com.svg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const CreateTask = ({task,descr,handleSubmit}) => {
    return (
        <div className='h-15 w-screen p-2 flex items-center justify-center'>
            <div className='bg-white w-48/50 h-15 rounded-lg items-center p-2 flex justify-between text-1xl text-purple-400 font-medium'>
             <ul className='flex space-x-2'>
                <li className='space-x-2'><span>Name of Task</span><input className='border-2 p-2 h-6 rounded-lg outline-1 outline-purple-400' onChange={(e)=> task(e.target.value)}/></li>
                <li className='space-x-2'><span>Task Description</span><input className='border-2 p-2 h-6 rounded-lg outline-1 outline-purple-400' onChange={(e) => descr(e.target.value)}/></li>
             </ul>
             <ul className='pr-3 flex space-x-10'>
            <li><span><Link to = '/main_page'><button className='border-2 text-sm border-purple-400 p-1 rounded-md ' onClick={handleSubmit}>Submit</button></Link></span></li>
            </ul>
            </div>
        </div>
    )
}



const RenderNothing = () => {
    return (
        <div className='rounded-lg w-49/50 h-100 bg-white m-4 flex justify-center text-2xl items-center flex-col font-medium text-purple-400'>
          <span>There is no task here.</span>
           <span>Click + to get started</span>
        </div>
    )
}



const RenderTask = ({task_data, token}) => {
    const name = task_data.task_name
    const handleDelete = async (name) => {
    try {
    const response = await fetch('http://127.0.0.1:8000/delete_task',
        {
            method : "DELETE",
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(name)
        }
    )
    const data = await response.json()
    console.log(data)
    if (response.status == 204){
        console.log("Task Deleted")
        navigate('/main_page')
    }
    else {
        console.log("Task couldn't be deleted")
    }
}
    catch (error) {
        console.log(`This error occured :${error}`)
    } 
}
     if (!Array.isArray(task_data) || task_data.length === 0) return <RenderNothing/>;
      return (
    <div className='rounded-lg w-49/50 p-4 h-105 bg-white m-4 flex-col justify-center font-medium text-purple-400  '>
        <div className='space-y-4'>
            {task_data.map((item) => ( 
                <div key={item.id} className='max-h-30 p-2 w-50/50 rounded-lg bg-purple-400 font-medium text-white'>
                <ul className='flex justify-center space-x-40 text-sm items-center'>
                      <li className='w-30'><span>Name</span></li>
                      <li className='w-30'><span>Task Description</span></li>
                      <li className='w-30'><span>Date</span></li>
                       <li className='w-30'><span></span></li>
               </ul>
                    <ul className='flex justify-center space-x-40 items-center'>
                      <li className='w-30'><span>{item.task_name}</span></li>
                      <li className='w-30 '><span>{item.task_description}</span></li>
                      <li className='w-30'><span>{item.date_created}</span></li>
                      <li className='w-30 '><button className='border-2 border-white p-2 rounded-lg' id={item.task_name} onClick={() => handleDelete(item.task_name)}>Check</button></li>
                    </ul>
                </div>
            ))}
        </div>
        </div>
    )
}

const RenderThings = ({task_data,task_status , token}) => {
    return (
        <div>
        {task_status &&  <RenderTask task_data = {task_data} token = {token}  /> }
        </div>
    )
}

const Task_Manager =  () => {
    const isMobile = useMediaQuery({ maxWidth: 320 });
    const [task_name, setTaskName] = useState('')
    const [task_descr, setTaskDescr] = useState('')
    const [c_task, setCTask] = useState()
    const [debouncedName, setDebouncedName] = useState('')
    const [debouncedDescr, setDebouncedDescr] = useState('')
    const debouncedNameRef = useRef('')
    const debouncedDescrRef = useRef('')
    const [task, setTask] = useState([])
    const [retrstatus, setRetrstatus] = useState(false)
    const navigate = useNavigate()
    console.log(`Debounced Name: ${debouncedName}, Debounced Description: ${debouncedDescr}`)
        useEffect (
        () => {
            const handler = setTimeout(
                () => {
                    setDebouncedName(task_name),
                    setDebouncedDescr(task_descr)
                    debouncedNameRef.current = task_name  
                    debouncedDescrRef.current = task_descr
                },500
            )
            return () => clearTimeout(handler)
        },[task_name,task_descr]
    )
  const access_token = sessionStorage.getItem("access_token")
    

const handleGet = async () => {
    try {
    const response = await fetch(
        'http://127.0.0.1:8000/get_tasks',{
            method:"GET",
            headers: {
                "Authorization":`Bearer ${access_token}`,
                "Content-Type":"application/x-www-form-urlencoded",
            }
        }
    )
    const data = await response.json()
    data.tasks.length = 4
    setTask(data.tasks)
    setRetrstatus(Array.isArray(data.tasks) && data.tasks.length > 0)
    if (response.ok) {
        console.log("Task Gotten")
        console.log(data.tasks)
    }
    else {
        console.log("Task Retrieval not successful.")
    }
}
    catch (error){
        console.log(`Check Internet Connection or this error message : ${error}`)
    }
    
      }
useEffect(() => {
    handleGet()
},[]
)
 const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");

  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setStatus("Please select a valid image file.");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Show preview
      setStatus("");
    }
  };
  const handleUpload = async () => {
    if (!file) {
      setStatus("No file selected.");
      return;
    }

    try {
      setStatus("Uploading...");

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("https://your-server.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      setStatus(`Upload successful! File URL: ${result.url}`);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

    
   const create_task = async () => {
    const params = new URLSearchParams()
    params.append("task_name",debouncedNameRef.current)
    params.append("task_description",debouncedDescrRef.current)
    try {
        const response = await fetch('http://127.0.0.1:8000/create_task',{
            method : "POST",
            headers : {"Authorization" : `Bearer ${access_token}`,
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body : params.toString()
        }
        )
          const data = await response.json()
          console.log(data)
        if (response.ok) {
            console.log("Task is Created")
            navigate('/main_page')
        }
        else {
            console.log("Task creation not successful.")
        }
    }
    catch (error){
        console.log(`Check Internet Connection or this error message : ${error}`)
    }
}
    return (
    <div>
        <div className= {`bg-purple-400 flex-col h-screen w-screen`}>
            <div className='bg-white h-15 w-full flex p-3 text-2xl font-mono justify-between text-purple-400'>
                <ul className='flex items-center space-x-3'>
                <li><span>Tegatask</span></li>
                <li><img src={notepad} className='h-6'/></li>
                </ul>
                <div className='w-10 h-10 bg-purple-400 rounded-4xl'>
                     <input type="file" accept="image/*" onChange={handleFileChange} />
                     <button onClick={handleUpload}>Upload</button>
                </div>
            </div>
            <div className='w-50 p-3 font-medium text-white flex'>
                <ul className='flex space-x-2 items-center pl-3'>
                <li ><span className='text-1xl'>Create New</span></li>
                <li className='pt-2'><button className='items-center' onClick={()=>setCTask(<CreateTask task = {setTaskName} descr = {setTaskDescr} handleSubmit={create_task}/>)}><img src={add} className='h-5'/></button></li>
                </ul>
            </div>
            {c_task}
            {<RenderThings task_data = {task} task_status = {retrstatus} token = {access_token} />}
        </div>
    </div>
    )
    
}

export default Task_Manager;