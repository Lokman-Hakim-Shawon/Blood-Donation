import axios from "axios";
import Swal from "sweetalert2";
// import { useState } from "react";

const AddBlogs = () => {
    // const [img,setimg]=useState(null)
    // console.log(img)
    const handleblogs=e=>{
        e.preventDefault()
        const form=e.target
        const file=form.file.files[0]
        const title=form.title.value
        const articles=form.articles.value
        const imgbb_key='ceccd7f28cf74921bd1fb98402d6032f'
        console.log(title,articles,file)
        const formData=new FormData()
       formData.append('image',file)
       axios.post(`https://api.imgbb.com/1/upload?key=${imgbb_key}`,formData)
       .then(res=>{
         const img=res.data.data.url
         const blogData={img,title,articles}
         axios.post('https://assignment-12-server-drab-nine.vercel.app/blog_data',blogData)
         .then(res=>{
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration successfull",
                showConfirmButton: false,
                timer: 2000
              });
            console.log(res.data)
         })
         .catch(error=>console.log(error))
       })
       .catch(error=>console.log(error))
    }
    return (
        <div className="hero min-h-screen bg-base-200">
     <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleblogs}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blog Image</span>
          </label>
          <input type="file" name='file' className="input input-bordered" required />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" name='title' placeholder="title" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Articles</span>
          </label>
          {/* <input type="text" name='title' placeholder="title" className="input input-bordered" required /> */}
          <textarea name='articles' className="border border-2 rounded-xl lg:h-64 p-5 text-xl" placeholder="write new blogs...."></textarea>
        </div>
        
        <div className="form-control mt-6">
          <button className="btn bg-blue-300 font-bold">Registration</button>
        </div>
      
      </form>
    </div>
</div>
    );
};

export default AddBlogs;