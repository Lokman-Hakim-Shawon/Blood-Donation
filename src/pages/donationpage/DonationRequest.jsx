import axios from "axios";
import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../firebase/AuthProvider";

const UserDonorRequest = () => {
  // const {user}=useContext(AuthContext)
    const [data,setdata]=useState([])
    console.log(data)
    useEffect(()=>{
        axios.get('https://assignment-12-server-drab-nine.vercel.app/blood_request')
    .then(res=>{
        // console.log('donor ',res.data)
        const inprogress='inprogress'
        const filterdata=res.data.filter(userdata=>inprogress==userdata.pending)
        setdata(filterdata)
    })
    .catch(error=>console.log(error))
    },[])
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 my-10">
      {
        data.map(datas=><div key={datas._id} className="card bg-base-100 shadow-xl">
        <div className="card-body">
            <p className="text-end text-xl text-gray-400 font-bold">{datas.pending}</p>
          <h2 className="card-title">Need {datas.blood} Blood</h2>
          <h2 className="card-title">Need {datas.blood} Blood</h2>
          <h3 className="text-lg">Name :{datas.name} </h3>
          <h3 className="text-lg">Hospital : {datas.hospital}</h3>
          <h3 className="text-lg">Location : {datas.Singleupazila} upazila, {datas.Singledistrict}</h3>
          <h3 className="text-lg">Date : {datas.date}</h3>
          <h3 className="text-lg">Last Time : {datas.time}</h3>
          {
            datas.problem.length>30?
            <p>{datas.problem.substring(0,130)}.....see more</p>
            :
            <p>{datas.problem}</p>
          }
          <div className="card-actions justify-end">
            <Link to={'/view_details'} state={datas} ><button className="btn bg-blue-300 font-bold">View Details</button></Link>
          </div>
        </div>
      </div>)
      }
    </div>
    );
};

export default UserDonorRequest;