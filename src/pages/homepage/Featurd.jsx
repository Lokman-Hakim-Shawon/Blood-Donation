import axios from "axios";
import { useState } from "react";

const Featurd = () => {
    const [data,setdata]=useState([])
    axios.get('https://assignment-12-server-drab-nine.vercel.app/featuredData')
    .then(res=>setdata(res.data))
    .catch(error=>console.log(error))
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 my-10">
            {
                data.map(datas=><div key={datas.id} className="card card-compact">
                <figure><img src={datas.image} alt="Shoes" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{datas.title}</h2>
                  <p>{datas.des}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>)
            }
        </div>
    );
};

export default Featurd;