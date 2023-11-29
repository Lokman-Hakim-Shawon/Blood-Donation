import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthProvider";
import axios from "axios";

const AdminLayout = () => {
    const [passdata,setpassdata]=useState([])
    const [info,setinfo]=useState([])
    const {user}=useContext(AuthContext)
    const img=user?.photoURL
    const email=user?.email
    // console.log(img,email)
    // const length=passdata.length
    // const admin='lokmanhakim@gmail.com'
    const name=user?.displayName
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
                <li className="bg-blue-200"><NavLink to='/admin/profile' state={info} >
                <div className="avatar space-x-5 flex items-center">
                       <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={img} />
                     </div>
                      <h1>{name}</h1>
                    </div> 
                </NavLink></li>
                <li className="bg-blue-200"><NavLink to='/admin' data={length}>Admin Home</NavLink></li>
                <li><NavLink to='/admin/all_request'>All Donation Request</NavLink></li>
                <li><NavLink to='/admin/all_pending'>All pending Request</NavLink></li>
                <li><NavLink to='/admin/add_blogs'> Add Blogs</NavLink></li>
                <li><NavLink to='/admin/all_volunteer'> All Volunteer Info</NavLink></li>
                <li><NavLink to='/admin/all_users' state={passdata}> All Users</NavLink></li>
                <li><NavLink to='/'>Menu Page</NavLink></li>
            </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AdminLayout;