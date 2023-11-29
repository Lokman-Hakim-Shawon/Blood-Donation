import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './firebase/AuthProvider';
import { router } from './layout/Routes';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
   <div className='lg:px-24'>
   <RouterProvider router={router} />
   </div>
   </AuthProvider>
  </React.StrictMode>,
)
