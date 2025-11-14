import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/Router.jsx'
import { RouterProvider } from "react-router/dom";
import AuthProvider from './Context/Provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-gray-100'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
