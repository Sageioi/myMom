import {Link} from "react-router-dom"

const ErrorPage = () => {
    return (
        <div className="bg-purple-400 flex justify-center items-center h-screen text-4xl">
        <ul className="outline-none flex flex-col items-center space-y-6">
            <li className="text-white font-extrabold">
            <span>Hi, User</span>
            </li>
            <li className="text-white font-extrabold">
                You are doing a wrong task being here but you could always 
            </li>
            <li className="bg-white p-3 w-56 flex flex-col items-center rounded-4xl">
                <Link to = {{pathname : "/"}}>
                <button className="text-purple-400 font-extrabold">Go Back</button>
                </Link>
            </li>
            </ul>
        </div>
    )
}
export default ErrorPage