import { Link, useLocation } from "react-router-dom";

const Profile = () => {
  
    const location =useLocation()
    const users=location.state
    console.log(users)
    return (
        <div>
           <div className={`card `}>
  <div className="card-body">
    <div className="avatar">
  <div className="w-64 rounded border border-4">
    <img src={users.img} />
  </div>
</div>
    <h2 className="card-title text-4xl">Name : {users.name}</h2>
    <p className="text-xl font-bold">Distrcit : {users.Singledistrict}</p>
    <p className="text-xl font-bold">Upazila : {users.Singleupazila}</p>
    <p className="text-xl font-bold">Blood Group : {users.blood}</p>
    <p className="text-xl font-bold">Email adress : {users.email}</p>
    <div className="card-actions justify-end">
      <Link to='/dashboard/update_profile' state={users._id}><button className="btn bg-blue-300 font-bold">Edit your profile</button></Link>
    </div>
  </div>
</div> 
        </div>
    );
};

export default Profile;