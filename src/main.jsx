import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LandingPage from './app_section/LandingPage.jsx'
import LoginPage from './auth_section/LoginPage.jsx'
import Forget_Page from './auth_section/Forget_Page.jsx'
import Verify_Page from './auth_section/Verify_Page.jsx'
import Task_Manager from './app_section/MainPage.jsx'
import ErrorPage from './route_section/ErrorPage.jsx'
import CreateAccount from './auth_section/CreateAccount.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([{
  path : "", element:<App/>},
  {path:"/create_account", element: <CreateAccount/>},
  {path : "/login",element:<LoginPage/>},
  {path : "/home_page",element:<LandingPage/>},
  {path : "/main_page", element: <Task_Manager/>},
  {path : "/forget_page", element: <Forget_Page/>},
  {path : "/verify_page", element: <Verify_Page/>},
  {path :"*", element: <ErrorPage/>}
,

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
