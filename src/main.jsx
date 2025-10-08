import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {RouterProvider} from "react-router";
import { router } from './router/router.jsx';

// Animate on scrolling
import AOS from 'aos'
import 'aos/dist/aos.css'
// Initialize AOS here
AOS.init({
  duration: 800, // how long animation runs
  once: true,    // only animate once
  offset: 100,   // trigger point from top
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>
    <RouterProvider router={router}></RouterProvider>

    </div>
  </StrictMode>,
)
