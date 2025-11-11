import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/Router.jsx'
import { RouterProvider } from "react-router/dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className='bg-gray-100'>
     <RouterProvider router={router} />
   </div>
  </StrictMode>,
)
