import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{BrowserRouter as Router} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { AuthProvider } from "./context/auth";
import { SearchProvider } from './context/search'
import { CartProvider } from './context/cart'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
   <Router>
    <App />
    <ToastContainer
position="top-right"
bodyClassName="toastBody"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </Router>
    </CartProvider>
    </SearchProvider>
    </AuthProvider>
  </React.StrictMode>,
)
