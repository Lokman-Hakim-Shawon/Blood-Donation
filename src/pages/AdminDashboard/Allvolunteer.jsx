// import { useLocation } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";

const Allvolunteer = () => {
    const [data,setdata]=useState([])
    const [volunteer,setvolunteer]=useState([])
    // console.log('data',data,'volunteer',volunteer)
    useEffect(()=>{
        axios.get('http://localhost:5000/userinformation')
        .then(res=>{
            setdata(res.data)
        })
        .catch(error=>console.log(error))
        axios.get('http://localhost:5000/volunteer_data')
        .then(res=>setvolunteer(res.data))
        .catch(error=>console.log(error))
    },[])
    // data.map(datas=>console.log('mapdata',datas.email))
    return (
        <div>
            <div className="overflow-x-auto my-10">
  <table className="table">
    {/* head */}
    <thead >
      <tr className="text-center font-bold text-5xl">
        Volunteer List
      </tr>
    </thead>
     {
        volunteer.map(volunteers=><tbody key={volunteers._id}>
            {
              data.map(datas=><tr key={datas._id}>
                 {
                    datas.email===volunteers.email?
                    <tr>
                 <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={datas.img} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                      <div className="font-bold">{datas.name}</div>
                  </td>
                  <td>{datas.email}</td>
                  <td>
                    <p>{datas.Singledistrict}</p>
                  </td>   
                  <td>Delete</td>
                 </tr>
                    :
                    ''
                 }
                </tr>)
            }
          </tbody>)
     }
  </table>
</div> 
        </div>
    );
};

export default Allvolunteer;