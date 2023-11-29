import {
    createBrowserRouter,
  } from "react-router-dom";
import Mainlayout from './Mainlayout';
import Home from './../pages/homepage/Home';
import DonationRequest from './../pages/donationpage/DonationRequest';
import PrivateRout from './../components/PrivateRout';
import Login from './../components/Login';
import Registration from './../components/Registration';
import UserLayout from './../pages/userDashboard/UserLayout';
import UserHome from "../pages/userDashboard/UserHome";
import UserDonorRequest from "../pages/userDashboard/UserDonorRequest";
import MyDonation from "../pages/userDashboard/MyDonation";
import ViewDetails from "../pages/userDashboard/ViewDetails";
import Profile from "../pages/userDashboard/Profile";
import AdminHome from "../pages/AdminDashboard/AdminHome";
import Allusers from "../pages/AdminDashboard/Allusers";
import AdminLayout from "../pages/AdminDashboard/AdminLayout";
import AdminAllRequest from "../pages/AdminDashboard/adminAllRequest";
import Allvolunteer from "../pages/AdminDashboard/Allvolunteer";
import AddBlogs from "../pages/AdminDashboard/AddBlogs";
import Blogs from "../pages/donationpage/Blogs";
import UserMyRequest from "../pages/userDashboard/UserMyRequest";
import PendingRequest from "../pages/AdminDashboard/PendingRequest";
import UpdateProfile from "../pages/userDashboard/UpdateProfile";
import SearchDonor from "../components/SearchDonor";
import AllDonatRequest from "../pages/userDashboard/AllDonatRequest";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Mainlayout></Mainlayout>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/donation_request',
          element:<PrivateRout><DonationRequest></DonationRequest></PrivateRout>
        },
        {
          path:'/blogs',
          element:<Blogs></Blogs>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/registration',
          element:<Registration></Registration>
        },
        {
          path:'/search_donor',
          element:<SearchDonor></SearchDonor>
        }
      ]
    },
    {
      path:'/dashboard',
      element:<UserLayout></UserLayout>,
      children:[
        {
          path:'/dashboard',
          element:<UserHome></UserHome>
        },
        {
          path:'/dashboard/donor_request',
          element:<UserDonorRequest></UserDonorRequest>
        },
        {
          path:'/dashboard/all_donor_request',
          element:<AllDonatRequest></AllDonatRequest>
        },
        {
           path:'/dashboard/my_request',
           element:<UserMyRequest></UserMyRequest>
        },
        {
          path:'/dashboard/add_blogs',
          element:<AddBlogs></AddBlogs>
        },
        {
          path:'/dashboard/my_donation',
          element:<MyDonation></MyDonation>
        },
        {
          path:'/dashboard/profile',
          element:<Profile></Profile>
        },
        {
          path:'/dashboard/update_profile',
          element:<UpdateProfile></UpdateProfile>
        }
        
      ]
    },
    {
      path:'/view_details',
      element:<ViewDetails></ViewDetails>
    },
    {
      path:'/admin',
      element:<AdminLayout></AdminLayout>,
      children:[
        {
          path:'/admin',
          element:<AdminHome></AdminHome>
        },
        {
          path:'/admin/all_users',
          element:<Allusers></Allusers>
        },
        {
          path:'/admin/all_request',
          element:<AdminAllRequest></AdminAllRequest>
        },
        {
          path:'/admin/all_volunteer',
          element:<Allvolunteer></Allvolunteer>
        },
        {
          path:'/admin/add_blogs',
          element:<AddBlogs></AddBlogs>
        },
        {
          path:'/admin/all_pending',
          element:<PendingRequest></PendingRequest>
        }
      ]
    }
  ]);