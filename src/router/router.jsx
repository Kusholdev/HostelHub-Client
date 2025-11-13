import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../Authentication/Login/Login";
import Registration from "../Authentication/Registration/Registration";
import Meals from "../Components/Meals/Meals";
import MealsDetailsPage from "../Components/MealsDetailsPage/MealsDetailsPage";
import PrivateRoutes from "../routes/PrivateRoutes";
import DashBoardLayout from "../layout/DashBoardLayout";
import MakeAdmin from "../Admin/MakeAdmin/MakeAdmin";
import MyProfile from "../UsersDashboard/myProfile/myProfile";
import ReviewMeals from "../UsersDashboard/ReviewMeals/RequestedMeals";
import MyReviews from "../UsersDashboard/MyReviews/MyReviews";
import AddMeal from "../Admin/AddMeal/AddMeal";
import AllMeals from "../Admin/AllMealsTable/AllMealsTable";
import AllMealsTable from "../Admin/AllMealsTable/AllMealsTable";
import AllReviews from "../Admin/AllReviews/AllReviews";
import MemberShip from "../Components/Membership/MemberShip";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../UsersDashboard/PaymentHistory/PaymentHistory";
import RequestedMeals from "../UsersDashboard/ReviewMeals/RequestedMeals";
import ServeMeals from "../Admin/ServeMeals/ServeMeals";
import UpComingMeals from "../Admin/UpComingMeals/UpComingMeals";

export const router = createBrowserRouter([
   {
      path: "/",
      Component: RootLayout,
      children: [
         {
            index: true,
            Component: Home
         },

         {
            path: 'meals',
            Component: Meals
         },
         {
            path: 'meals/:id',
            Component: MealsDetailsPage
         },
         {
            path: 'addMeal',
            Component: AddMeal
         },
      ]
   },
   {
      path: '/',
      Component: AuthLayout,
      children: [
         {
            path: "login",
            Component: Login
         },
         {
            path: 'register',
            Component: Registration
         }
      ]
   },
   {
      path: '/dashboard',
      element: <PrivateRoutes>
         <DashBoardLayout></DashBoardLayout>
      </PrivateRoutes>,
      children: [
         {
            index: true, // 👈 this means "default child route"
            element: <h2 className="text-center mt-10 text-xl">Welcome to the Dashboard!</h2>,
         },
         {
            path: 'makeAdmin',
            Component: MakeAdmin
         },
         {
            path: 'myProfile',
            Component: MyProfile
         },
         {
            path: 'RequestedMeals',
            Component: RequestedMeals
         },
         {
            path: 'myReviews',
            Component: MyReviews
         },
         {
            path: 'allMeal',
            Component: AllMealsTable
         },
         {
            path: 'allReviews',
            Component: AllReviews
         },
         {
            path: 'membership',
            Component: MemberShip
         },

         {
            path: 'payment/:email/:plan/:price',
            Component: Payment

         },
         {
            path: 'paymentHistory',
            Component: PaymentHistory
         },
         {
            path: 'serveMeals',
            Component: ServeMeals
         },
         {
            path:'upComingMeals',
            Component:UpComingMeals
         }
      ]
   }
]);
