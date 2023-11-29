
const Contact = () => {
    return (
        <div className="bg-blue-100 p-10">
            <h1 className="text-center text-5xl  font-bold underline">Contact us</h1>
          <div className="flex justify-between  text-xl">
          <div className="">
            <div className="text-3xl font-bold underline text-center pb-5">Social</div>
             <h1>Phone Number : +8801404142439</h1>
             <h1>Whats App : 01404142439</h1>
             <h1>Facebook : facebook.com/Lokman Hakim Shawon</h1>
             <h1>Github : github.com/Lokman-hakim-shawon</h1>
          </div>  
          <div>
            <div className="text-3xl  font-bold underline text-center pb-5">Local</div>
            <div className="flex flex-col space-y-5 justify-center ">
              <h1>Gazipura Sataish</h1>
              <h1>Tongi, Gazipur</h1>
            </div>
          </div>
          </div>
        </div>
    );
};

export default Contact;