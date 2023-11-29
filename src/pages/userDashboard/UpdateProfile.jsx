import axios from "axios";
import { updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthProvider";

const UpdateProfile = () => {
  const {user}=useContext(AuthContext)
  // console.log(user?.email)
    const [blood,setblood]=useState(null)
  const [district,setdistrict]=useState([])
  const [Singledistrict,setSingledistrict]=useState([])
  const [upazila,setupazila]=useState([])
  const [Singleupazila,setSingleupazila]=useState([])
  const Navigate=useNavigate()
  const location=useLocation()
  const data=location.state
  console.log(data,'data')
    useEffect(()=>{
        axios.get('http://localhost:5000/districtsData')
        .then(res=>setdistrict(res.data))
        .catch(error=>console.log(error))
    
        axios.get('http://localhost:5000/upazilasData')
        .then(res=>setupazila(res.data))
        .catch(error=>console.log(error))
      },[])
    const handlesubmit=(e)=>{
      e.preventDefault()
        const form=e.target
        const name=form.name.value
        const file=form.file.files[0]
        const active='active'
        const imgbb_key='ceccd7f28cf74921bd1fb98402d6032f'
        const formData=new FormData()
       formData.append('image',file)
       axios.post(`https://api.imgbb.com/1/upload?key=${imgbb_key}`,formData)
       .then(res=>{
        // console.log(res.data.data.url,'res.data')
         const img=res.data.data.url
         const updateuser={img,active,blood,name,Singledistrict,Singleupazila}
         axios.put(`http://localhost:5000/userinformation/${data}`,updateuser)
         .then(res=>{
          console.log('axios post',res)
          Navigate('/dashboard')
         })
         .catch(error=>console.log('axios error',error))
         updateProfile(user,{
          displayName:name,
          photoURL:img
        })
       })
       .catch(error=>console.log(error))
        // console.log('submited')
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
        <div className="hero min-h-screen bg-base-200">
     <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handlesubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">File</span>
          </label>
          <input type="file" name='file' className="input input-bordered" required />
          
        </div>
        
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
        <div className="form-control mt-6">
          <button className="btn bg-blue-300 font-bold">update profile</button>
        </div>
        
      </form>
    </div>
</div>
    );
};

export default UpdateProfile;