import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Registration = () => {
  const Navigate=useNavigate()
  const {createuser}=useContext(AuthContext)
  const [blood,setblood]=useState(null)
  const [district,setdistrict]=useState([])
  const [Singledistrict,setSingledistrict]=useState([])
  const [upazila,setupazila]=useState([])
  const [Singleupazila,setSingleupazila]=useState([])
  useEffect(()=>{
    axios.get('https://assignment-12-server-drab-nine.vercel.app/districtsData')
    .then(res=>setdistrict(res.data))
    .catch(error=>console.log(error))

    axios.get('https://assignment-12-server-drab-nine.vercel.app/upazilasData')
    .then(res=>setupazila(res.data))
    .catch(error=>console.log(error))
  },[])  
  const handleRegister= e =>{
    e.preventDefault()
    // console.log('images',image)
        const form=e.target
        const name=form.name.value
        const file=form.file.files[0]
        const imgbb_key='ceccd7f28cf74921bd1fb98402d6032f'
        const email=form.email.value
        const password=form.password.value
        const active='active'
       // upload imgbb
       const formData=new FormData()
       formData.append('image',file)
       axios.post(`https://api.imgbb.com/1/upload?key=${imgbb_key}`,formData)
       .then(res=>{
         const img=res.data.data.url
         // setimage(img)
         const userinfo={img,name,active,blood,Singledistrict,Singleupazila,email}
         createuser(email,password)
         .then(res=>{
          axios.post('https://assignment-12-server-drab-nine.vercel.app/userinformation',userinfo)
          .then(res=>console.log('axios post',res))
          .catch(error=>console.log('axios error',error))
          console.log(userinfo)
          console.log(res)
              updateProfile(res.user,{
                displayName:name,
                photoURL:img
              })
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration successfull",
            showConfirmButton: false,
            timer: 2000
          });
          Navigate('/')
        })
        .catch(error=>console.log(error)) 
        
         console.log(img,name)
       })        
       .catch(error=>console.log(error))     
       
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
      <form className="card-body" onSubmit={handleRegister}>
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-blue-300 font-bold">Registration</button>
        </div>
        <p>Have an account? <span className="text-green-500 underline"><Link to='/login'>Login</Link></span></p>
      </form>
    </div>
</div>
    );
};

export default Registration;