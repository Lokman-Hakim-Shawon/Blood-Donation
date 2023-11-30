import axios from "axios";
import { useEffect, useState } from "react";

const SearchDonor = () => {
    const [blood,setblood]=useState(null)
    const [district,setdistrict]=useState([])
  const [Singledistrict,setSingledistrict]=useState([])
     const [upazila,setupazila]=useState([])
  const [Singleupazila,setSingleupazila]=useState([])
  const [search,setsearch]=useState([])
    console.log(search)
    useEffect(()=>{
        axios.get('https://assignment-12-server-drab-nine.vercel.app/districtsData')
        .then(res=>setdistrict(res.data))
        .catch(error=>console.log(error))
    
        axios.get('https://assignment-12-server-drab-nine.vercel.app/upazilasData')
        .then(res=>setupazila(res.data))
        .catch(error=>console.log(error))
      },[])
   
       const handlesubmit=(e)=>{
        e.preventDefault()
        axios.get('https://assignment-12-server-drab-nine.vercel.app/userinformation')
        .then(res=>{
            console.log(res.data)
            const filterdata= res.data.filter(fildata=>fildata.blood==blood && fildata.Singledistrict==Singledistrict && fildata.Singleupazila==Singleupazila)
            console.log(filterdata,'filterdata')
            setsearch(filterdata)
        })
        .catch(error=>console.log(error))
        // console.log('sumited',blood,Singledistrict,Singleupazila)
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
           <div className="hero ">
       <div className="card shrink-0 w-full ">
        <form onSubmit={handlesubmit} className="">
        <div className="flex w-full space-x-5">
        <div className="form-control flex-1">
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
        <div className="form-control flex-1">
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
        <div className="form-control flex-1">
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
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-blue-300">SEARCH DONOR</button>
        </div>
      </form>
    </div>
</div> 
        
        <div  className="w-full border border-2 rounded-xl h-96 my-10">
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Profile</th>
        <th>Name</th>
        <th>email</th>
      </tr>
    </thead>
    <tbody>
      {
        search.map(data=><tr key={data._id}>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={data.img} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
              </div>
            </td>
            <td>
                <div className="font-bold">{data.name}</div>
            </td>
            <td>{data.email}</td>
            
          </tr>)
      }
    </tbody>
  </table>
</div> 
        </div>
        </div>
    );
};

export default SearchDonor;