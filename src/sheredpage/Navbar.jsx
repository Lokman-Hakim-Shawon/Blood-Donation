import { useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/AuthProvider";
import axios from "axios";
// import axios from "axios";
// import { signOut } from 'firebase/auth';

const Navbar = () => {
  const {user,signout}=useContext(AuthContext)
  const Navigate=useNavigate()
  const [isAdmin,setisAdmin]=useState(['lokmanhakim@gmail.com'])
  const email=user?.email
  console.log(isAdmin,'isAdmin')
  // console.log(blockdata,'setblockdata')
// console.log(isAdmin)
  // console.log(user?.photoURL,'logout')
  // const isUser='lokmanhakimshawon3@gmail.com'
  useEffect(()=>{
    axios.get('https://assignment-12-server-drab-nine.vercel.app/donat_data')
  .then(res=>{
    // console.log(res,'res')
    const filterdata=res.data.filter(fildata=>fildata.email==email)
    console.log(filterdata,'fildata')
    filterdata.map(mapdata=>setisAdmin(mapdata.email))
    // setisAdmin(filterdata)
     
  })
  .catch(error=>console.log(error))
  },[])
  const handleLogout=()=>{
      signout()
      .then(res=>console.log(res))
      .catch(error=>console.log(error))
  }

      const navlink=<>
      <Link to='/'><li>Home</li></Link>
      <Link to='/donation_request'><li>Donation Request</li></Link>
      
      <Link to='/blogs'><li>Blogs</li></Link>
      {
        user?
        <div>
          {
            email==isAdmin?
            <Link to='/admin'><li>Dashboard</li></Link>
            :
            isAdmin==[]?
            Navigate('/')
            :
            <Link to='/dashboard'><li>Dashboard</li></Link>
          }
        </div>
        :
        <div className="flex space-x-10 ">
              <Link to='/login'><li>Login</li></Link>
              <Link to='/registration'><li>Register</li></Link>
              </div>
            
         
      }
      </>
    return (
        <div >
            <div className="navbar bg-blue-300 py-5">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navlink}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Blood Donation</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 space-x-10 text-xl">
      {navlink}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user?
      <button onClick={handleLogout} className="btn">
        <img src={user?.photoURL}  className="h-10 w-10"/>
        <p>{user.displayName}</p> 
       Log Out
     </button>
      :
      ''
    //  <a className="btn">login</a>
    }
  </div>
</div>
        </div>
    );
};

export default Navbar;