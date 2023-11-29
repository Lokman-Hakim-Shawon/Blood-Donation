import axios from "axios";
import { useEffect, useState } from "react";

const Blogs = () => {
    const [data,setdata]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/blog_data')
        .then(res=>setdata(res.data))
        .catch(error=>console.log(error))
    },[])
    return (
        <div className="my-10">
            {
                data.map(datas=><div key={datas._id} className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={datas.img} alt="Shoes" className="lg:w-1/2 border border-2"/></figure>
                <div className="card-body">
                  <h2 className=" w-full font-blod text-center text-5xl pt-10 underline">{datas.title}</h2>
                  <p className="text-xl pl-20 py-10">{datas.articles}</p>
                </div>
              </div>    )
            }
        </div>
    );
};

export default Blogs;