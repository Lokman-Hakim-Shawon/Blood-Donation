import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthProvider";
import axios from "axios";
// import UserHome from "./UserHome";  

const UserLayout = () => {
    const {user}=useContext(AuthContext)
    const [info,setinfo]=useState([])
    const [passdata,setpassdata]=useState([])
    // console.log(passdata.length,'datas confirm')
    const img=user?.photoURL
    const email=user?.email
    console.log(passdata)
    // const length=passdata.length
    // const admin='lokmanhakim@gmail.com'
    const name=user?.displayName
    // const users={img,name,info}
    useEffect(()=>{
        axios.get('http://localhost:5000/userinformation')
    .then(res=>{
        const data=res.data
        setpassdata(data)
        data.map(datas=>email==datas.email?setinfo(datas):'')
    })
    .catch(error=>console.log(error))
    },[])
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-blue-300 ">
            <ul className="menu space-y-4 text-xl">
                <li className="bg-blue-200"><NavLink to='/dashboard/profile' state={info} >
                <div className="avatar space-x-5 flex items-center">
                       <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={img} />
                     </div>
                      <h1>{name}</h1>
                    </div> 
                </NavLink></li>
                <li className="bg-blue-200"><NavLink to='/dashboard'>User Home</NavLink></li>
                <li><NavLink to='/dashboard/donor_request'>Donation Request</NavLink></li>
                <li><NavLink to='/dashboard/My_request'>My Request</NavLink></li>
                <li><NavLink to='/dashboard/add_blogs'>Add Blogs</NavLink></li>
                <li><NavLink to='/dashboard/all_donor_request'>All Donation Request</NavLink></li>
                <li><NavLink to='/dashboard/my_donation'>My All Donation</NavLink></li>
                <li><NavLink to='/'>Menu Page</NavLink></li>
            </ul>
            </div>
            <div className="flex-1">
           <Outlet></Outlet> 
            </div>
        </div>
    );
};

export default UserLayout;