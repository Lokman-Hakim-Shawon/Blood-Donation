import { useContext, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import axios from "axios";
// import { useLocation } from "react-router-dom";

const AdminHome = () => {
    const {user}=useContext(AuthContext)
    const [length,setlength]=useState(null)
    const [userinfo,setuserinfo]=useState(null)
    const [volunteer,setvolunteer]=useState(null)
    const [blog,setblog]=useState(null)
    const [inporgress,setinprogress]=useState(null)
    const [done,setdone]=useState(null)
    axios.get('https://assignment-12-server-drab-nine.vercel.app/userinformation')
    .then(res=>setuserinfo(res.data.length))
    .catch(error=>console.log(error))
    axios.get('https://assignment-12-server-drab-nine.vercel.app/blood_request')
    .then(res=>setlength(res.data.length))
    .catch(error=>console.log(error))
    axios.get('https://assignment-12-server-drab-nine.vercel.app/volunteer_data')
    .then(res=>setvolunteer(res.data.length))
    .catch(error=>console.log(error))
    axios.get('https://assignment-12-server-drab-nine.vercel.app/blog_data')
    .then(res=>setblog(res.data.length))
    .catch(error=>console.log(error))
    axios.get('https://assignment-12-server-drab-nine.vercel.app/blood_request')
    .then(res=>{
      const filterdata=res.data.filter(fildata=>'inprogress'==fildata.pending)
      setinprogress(filterdata.length)
    })
    .catch(error=>console.log(error))
    axios.get('https://assignment-12-server-drab-nine.vercel.app/blood_request')
    .then(res=>{
      const filterdata=res.data.filter(fildata=>'Done'==fildata.pending)
      setdone(filterdata.length)
    })
    .catch(error=>console.log(error))
    // console.log(length,'datauserdata')
    return (
        <div>
            <h1 className="bg-blue-100 py-10 text-center text-3xl font-bold">Hello {user?.displayName} wellcome to admin page</h1>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:mx-10 my-10 lg:gap-10 gap-2">
            <div className="card w-64 lg:w-96 bg-orange-400 text-white ">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl">TOTAL USER</h2>
                <p className="text-5xl">{userinfo}</p>
              </div>
           </div>
            <div className="card w-64 lg:w-96 bg-pink-400 text-white ">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl">TOTAL REQUEST</h2>
                <p className="text-5xl">{length}</p>
              </div>
           </div>
            <div className="card w-64 lg:w-96 bg-blue-400 text-white ">
              <div className="card-body items-center text-center">
                <h2 className="card-title  text-3xl">TOTAL VOLUNTEER</h2>
                <p className="text-5xl">{volunteer}</p>
              </div>
           </div>
            <div className="card w-64 lg:w-96 bg-green-400 text-white ">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl">TOTAL BLOGS</h2>
                <p className="text-5xl">{blog}</p>
              </div>
           </div>
            <div className="card w-64 lg:w-96 bg-gray-400 text-white ">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl">TOTAL PENDING</h2>
                <p className="text-5xl">{inporgress}</p>
              </div>
           </div>
            <div className="card w-64 lg:w-96 bg-yellow-400 text-white ">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl">TOTAL DONE</h2>
                <p className="text-5xl">{done}</p>
              </div>
           </div>
        </div>
        </div>
    );
};

export default AdminHome;