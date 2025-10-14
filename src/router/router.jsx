import {createBrowserRouter} from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../Authentication/Login/Login";
import Registration from "../Authentication/Registration/Registration";
import AddMeal from "../Admin/AddMeal/AddMeal";
import Meals from "../Components/Meals/Meals";
import MealsDetailsPage from "../Components/MealsDetailsPage/MealsDetailsPage";
  
 export const router = createBrowserRouter([
    {
      path: "/",
     Component:RootLayout,
     children:[
        {
            index:true,
            Component:Home
        },
        {
         path:'addMeal',
         Component:AddMeal
        },
        {
         path:'meals',
         Component:Meals
        },
        {
         path:'meals/:id',
         Component:MealsDetailsPage
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
  