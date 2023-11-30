import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Allusers = () => {
  const Navigate=useNavigate()
    const location = useLocation()
    const passdata=location.state
    // console.log(passdata,'usertdatasa')
    console.log(passdata.active,'passdata.active')
    const handleblock=(data)=>{
      
      if(data.active=='block'){
        const active='active'
        const updateActive={active,img:data.img,name:data.name,blood:data.blood,Singledistrict:data.Singledistrict,Singleupazila:data.Singleupazila}
      console.log(data,active)
      axios.put(`https://assignment-12-server-drab-nine.vercel.app/userinformation/${data._id}`,updateActive)
      .then(()=>{
        // console.log(res.data)
       Navigate('/')        
      })
      .catch(error=>console.log(error))
      console.log('user blocked')
      }
      else{
        const active='block'
        const updateActive={active,img:data.img,name:data.name,blood:data.blood,Singledistrict:data.Singledistrict,Singleupazila:data.Singleupazila}
      console.log(data,active)
      axios.put(`https://assignment-12-server-drab-nine.vercel.app/userinformation/${data._id}`,updateActive)
      .then(()=>{
        // console.log(res.data)
       Navigate('/')        
      })
      .catch(error=>console.log(error))
      console.log('user blocked')
      }
      
    }
    const handledelete=(id)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          axios.delete(`https://assignment-12-server-drab-nine.vercel.app/userinformation/${id}`)
          .then(()=>{
            Navigate('/')
          })
          .catch(error=>console.log(error))
        }
      });
      console.log('delete',id)
    }
    const handlevolunteer=(data)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You want to add volunteer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add Volunteer!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Add",
            text: "succefully added volunteer",
            icon: "success"
          });
          axios.post('https://assignment-12-server-drab-nine.vercel.app/volunteer_data',data)
       .then(()=>console.log('succefully added volunteer'))
       .catch(error=>console.log(error))
        }
      });
       
    }
    const handleAdmin=(data)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You want to add Admin!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add Admin!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Add",
            text: "succefully added Admin",
            icon: "success"
          });
          axios.post('https://assignment-12-server-drab-nine.vercel.app/donat_data',data)
       .then(()=>console.log('succefully added Admin'))
       .catch(error=>console.log(error))
        }
      });
    }
    return (
        <div>
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Profile</th>
        <th>Name</th>
        <th>email</th>
        <th>Volunteer</th>
        <th>Admin</th>
        <th>status</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
      {
        passdata.map(data=><tr key={data._id}>
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
            <td>
              <button onClick={()=>handlevolunteer(data)} className="btn bg-blue-300" >Volunteer</button>
            </td>   
            <td>
              <button onClick={()=>handleAdmin(data)} className="btn bg-blue-300" >Admin</button>
            </td>   
            <td>
              <button onClick={()=>handleblock(data)} className="btn bg-blue-300" >{data.active}</button>
            </td>   
            <td>
              <button onClick={()=>handledelete(data._id)} className="btn bg-blue-300">Delete</button>
            </td>
          </tr>)
      }
    </tbody>
  </table>
</div> 
        </div>
    );
};

export default Allusers;