import {createBrowserRouter} from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../Authentication/Login/Login";
import Registration from "../Authentication/Registration/Registration";
  
 export const router = createBrowserRouter([
    {
      path: "/",
     Component:RootLayout,
     children:[
        {
            index:true,
            Component:Home
        }
     ]
    },
    {
      path:'/',
      Component:AuthLayout,
      children:[
         {
            path:"login",
            Component:Login
         },
         {
            path:'register',
            Component:Registration
         }
      ]
    }
  ]);
  