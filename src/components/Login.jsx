import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const {signin}=useContext(AuthContext)
  const Navigate=useNavigate()
    const handleLogin=e=>{
        e.preventDefault()
        const form=e.target
        const email=form.email.value
        const password=form.password.value
        signin(email,password)
        .then(res=>{
          e.target.reset()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successfull",
            showConfirmButton: false,
            timer: 2000
          });
          Navigate('/')
          console.log(res,'login user')
        })
        .catch(error=>console.log(error))
    }
    return (
        <div className="hero min-h-screen bg-base-200">
     <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleLogin}>
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
          <button className="btn bg-blue-300 font-bold">Login</button>
        </div>
        <p>Are you new user? <span className="text-green-500 underline"><Link to='/registration'>Register</Link></span></p>
      </form>
    </div>
</div>
    );
};

export default Login;