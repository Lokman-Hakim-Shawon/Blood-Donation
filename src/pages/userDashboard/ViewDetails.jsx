import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../firebase/AuthProvider";
import axios from "axios";

const ViewDetails = () => {
  const Navigate=useNavigate()
    const {user} =useContext(AuthContext)
    const name=user?.displayName
    const email=user?.email
    const pending='Done'
    const donatName=name
    const donatEmail=email
    const donatData={donatName,donatEmail,pending}
    const location=useLocation()
    const data=location.state
    // const donatedata={donatName:name,donatEmail:email,pending:data.pending,requestName:data.name,requestEmail:data.email,hospital:data.hospital,blood:data.blood,upazila:data.Singleupazila,district:data.Singledistrict,date:data.date,time:data.time,problem:data.problem}
    // console.log(donatedata)
    // console.log(data,'uselocation')
    const handledonate=(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Donate",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Donate!"
          }).then((result) => {
            
            axios.put(`https://assignment-12-server-drab-nine.vercel.app/blood_request/${id}`,donatData)
            .then(res=>{
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Donate Successfull!",
                  text: "Your Donation has been Confirm.",
                  icon: "success"
                 });
                Navigate('/dashboard')                    
             }
              console.log(res.data)
             })
             .catch(error=>console.log(error))
            //  axios.post('https://assignment-12-server-drab-nine.vercel.app/donat_data',donatedata)
            //  .then(res=>{
            //   const resId=res.data._id
            //   axios.put(`https://assignment-12-server-drab-nine.vercel.app/donat_data/${resId}`,{pending:pending})
            //   .then(res=>{
            //     console.log(res.data)
            //     console.log('confirm data',res)
            //   })
            //   .catch(error=>console.log(error))
            //  })
            //  .catch(error=>console.log(error))
             
            
               
          });
    }
    const handleconfirm=id=>{
      const pending='inprogress'
    const donatName=''
    const donatEmail=''
    const donatData={donatName,donatEmail,pending}
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Donate",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Donate!"
    }).then((result) => {
      
      axios.put(`https://assignment-12-server-drab-nine.vercel.app/blood_request/${id}`,donatData)
      .then(res=>{
        console.log(res.data)
       })
       .catch(error=>console.log(error))
      if (result.isConfirmed) {
         Swal.fire({
           title: "Donate Successfull!",
           text: "Your Donation has been Confirm.",
           icon: "success"
          });
         Navigate('/admin/all_pending')                    
      }
         
    });
    }
    // const handleAdminDelete=(id)=>{
    //    console.log('admin cancel id',id)
    // }
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
          axios.delete(`https://assignment-12-server-drab-nine.vercel.app/blood_request/${id}`)
          .then(res=>{
           Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              console.log(res.data.deletedCount)
              if(user?.email=='lokmanhakim@gmail.com'){
                Navigate('/admin/all_pending')
              }
              else{
                Navigate('/dashboard/donor_request')
              }
          })
          .catch(error=>console.log(error))
          console.log('delete data',id)
        }
      });
      
    }
    const handleCancel=(id)=>{
      const donatName=''
    const donatEmail=''
    const pending='inprogress'
    const CancelDonation={donatName,donatEmail,pending}
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Donate",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Donate!"
      }).then((result) => {
        
        axios.put(`https://assignment-12-server-drab-nine.vercel.app/blood_request/${id}`,CancelDonation)
        .then(res=>{
          console.log(res.data)
         })
         .catch(error=>console.log(error))
        if (result.isConfirmed) {
           Swal.fire({
             title: "Donate Successfull!",
             text: "Your Donation has been Confirm.",
             icon: "success"
            });
            Navigate('/dashboard')                    
        }
           
      });
    }
    const handleskip=()=>{
      Navigate('/dashboard')
    }
    return (
        <div  className="card bg-base-100 shadow-xl mt-20">
            <div className="card-body ">
                <p className="text-end text-xl text-gray-400 font-bold">{data.pending}</p>
              <h1 className="font-bold text-center text-5xl py-10">Need {data.blood} Blood</h1>
              <h3 className="text-3xl">Name : {data.name}</h3>
              <h3 className="text-3xl">Hospital : {data.hospital}</h3>
              <h3 className="text-3xl">Location : {data.Singleupazila} upazila, {data.Singledistrict}</h3>
              <h3 className="text-3xl">Date : {data.date}</h3>
              <h3 className="text-3xl">Last Time : {data.time}</h3>
              <p className="text-xl">{data.problem}</p>
              <div className="card-actions justify-center w-full">
              { 
                email=='lokmanhakim@gmail.com'?
                <div className="space-x-20">
                  <button onClick={()=>handleconfirm(data._id)}  className="btn bg-blue-300 font-bold text-xl px-32  my-10">Accept</button>
                  <button onClick={()=>handledelete(data._id)} className="btn bg-blue-300 font-bold text-xl px-32  my-10">Delete</button>
                </div>
                :
                data.email===email?
                <button onClick={()=>handledelete(data._id)} className="btn bg-blue-300 font-bold text-xl px-32  my-10">Delete Request</button>
                :
                data.donatEmail==email?
                <button onClick={()=>handleCancel(data._id)} className="btn bg-blue-300 font-bold text-xl px-32  my-10">Cancel Donation</button>
                 : 
                <div>
                  <button onClick={()=>handledonate(data._id)} className="btn bg-blue-300 font-bold text-xl px-32  my-10">Donate</button>
                <button onClick={handleskip} className="btn bg-blue-300 font-bold text-xl px-32  my-10">Cancel</button>
                </div>
              }
              </div>
            </div>
          </div>
    );
};

export default ViewDetails;