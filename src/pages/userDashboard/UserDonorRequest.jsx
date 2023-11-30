
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../firebase/AuthProvider";

const AllDonatRequest = () => {
  const {user}=useContext(AuthContext)
    const [blood,setblood]=useState(null)
  const [district,setdistrict]=useState([])
  const [Singledistrict,setSingledistrict]=useState([])
  const [upazila,setupazila]=useState([])
  const [Singleupazila,setSingleupazila]=useState([])
  const [useinfo,setuseinfo]=useState(null)
  console.log(useinfo,'useinfo')
  useEffect(()=>{
    axios.get('https://assignment-12-server-drab-nine.vercel.app/userinformation')
    .then(res=>{
      const filterdata=res.data.filter(datas=>user?.email==datas.email)
      filterdata.map(datas=>setuseinfo(datas.active))
      
      
    })
    .catch(error=>console.log(error))

    fetch('https://assignment-12-server-drab-nine.vercel.app/districtsData')
    .then(res=>res.json())
    .then(data=>setdistrict(data))
  },[])
  useEffect(()=>{
    fetch('https://assignment-12-server-drab-nine.vercel.app/upazilasData')
    .then(res=>res.json())
    .then(data=>setupazila(data))
  },[])
    const handleRequest=e=>{
        e.preventDefault()
        const form=e.target
        const hospital=form.hospital.value
        const problem=form.textarea.value
        const date=form.date.value
        const time=form.time.value
        const email=user?.email
        const name=user?.displayName
        const pending='pending'
        const active='active'
        const donatName=''
        const donatEmail=''
        const bloodrequest={name,email,donatName,donatEmail,pending,active,date,time,hospital,problem,Singledistrict,Singleupazila,blood}
        console.log(bloodrequest)
        axios.post('https://assignment-12-server-drab-nine.vercel.app/blood_request',bloodrequest)
        .then(res=>{
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Donation reqest successfull",
                showConfirmButton: false,
                timer: 2000
              });
            console.log('blood request',res)
        })
        .catch(error=>console.log('blood request',error))
    }
    const handleselect=e=>{
        e.preventDefault()
        setblood(e.target.value)
      }
      const handledistrict=e=>{
        e.preventDefault()
        setSingledistrict(e.target.value)
      }
      const handleupazila=e=>{
        e.preventDefault()
        setSingleupazila(e.target.value)
      }
    return (
          <div>
            {
            useinfo=='block'?
            <div className="my-80 text-center text-5xl font-bold">Your Id is Block</div>
            :
            <div className="hero min-h-screen bg-base-200">
     <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleRequest}>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blood Group</span>
          </label>
          <select onChange={handleselect} id='select'defaultValue="Choose a Bloog Group"  className="input input-bordered"  required >
        <option  className='font-bold'>Choose Blood Group</option>
        <option value='A+'>A+</option>
        <option value='A-'>A-</option>
        <option value='B+'>B+</option>
        <option value='B-'>B-</option>
        <option value='O+'>O+</option>
        <option value='O-'>O-</option>
        <option value='AB+'>AB+</option>
        <option value='AB-'>AB-</option>
      </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Distrcit</span>
          </label>
          <select onChange={handledistrict} id='select'defaultValue="Choose a Bloog Group"  className="input input-bordered"  required >
        <option className='font-bold'>Choose District Name</option>
        {
          district.map(data=><option key={data._id} value={data.district}>{data.district}</option>)
        }
        
      </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upazila</span>
          </label>
          <select onChange={handleupazila} id='select'defaultValue="Choose a Bloog Group"  className="input input-bordered"  required >
        <option className='font-bold'>Choose Upazila Name</option>
        {
          upazila.map(datas=><option key={datas._id} value={datas.upazila}>{datas.upazila}</option>)
        }
        
      </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Data</span>
          </label>
          <input type="date" name='date' placeholder="date" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Time</span>
          </label>
          <input type="text" name='time' placeholder="time" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Hospital Name</span>
          </label>
          <input type="text" name='hospital' placeholder="hospital name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">details problem</span>
          </label>
          <textarea name='textarea' placeholder="details problem" className="border border-2 rounded-xl pl-5 lg:h-32"></textarea>
          {/* <input type="text" name='problem' placeholder="details problem" className="input input-bordered" required /> */}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-blue-300  font-bold">Donation Request</button>
            
        </div>
        
      </form>
    </div>
</div>
          }
        
          </div>
    );
};

export default AllDonatRequest;