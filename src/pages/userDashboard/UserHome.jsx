import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const UserHome = () => {
    const {user}=useContext(AuthContext)
    const [data,setdata]=useState([])
    console.log(data)
    useEffect(()=>{
        axios.get('http://localhost:5000/blood_request')
    .then(res=>{
      const filterdata=res.data.filter(userdata=>user?.email==userdata.donatEmail)
      setdata(filterdata)
    })
    .catch(error=>console.log(error))
    },[])
    return (
            <div>
                <h1 className="bg-blue-100 py-10 text-center text-3xl font-bold">Hello {user?.displayName} wellcome to this page</h1>
        <div className="grid grid-cols-2">
            {
                data.slice(0,4).map(datas=><div key={datas._id} className="card m-5 w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{datas.blood}</h2>
                  <h2 className="card-title">Location : {datas.upazila} upazila,{datas.district}</h2>
                  <h2 className="card-title">Date : {datas.date}</h2>
                  <h2 className="card-title">Time : {datas.time}</h2>
                  {
                    datas.problem.length>30?
                       <p>{datas.problem.substring(0,130)}.....see more</p>
                    :
                      <p>{datas.problem}</p>
                  }
                  <div className="card-actions justify-end">
                    {/* <button className="btn bg-blue-300 font-bold">Show Details</button> */}
                    <Link to={'/view_details'} state={datas} ><button className="btn bg-blue-300 font-bold">View Details</button></Link>
                  </div>
                </div>
              </div>)
            }
        </div>
            </div>
    );
};

export default UserHome;