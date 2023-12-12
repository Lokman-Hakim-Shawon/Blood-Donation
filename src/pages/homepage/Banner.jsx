import { Link } from 'react-router-dom';
import img from '../../assets/images/banner.jpg'
const Banner = () => {
    return (
        <div className="hero lg:h-[500px]" style={{backgroundImage: `url(${img})`}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="flex flex-col space-y-10 lg:space-y-20">
      <Link to='/registration'><button className="btn bg-blue-300 border-none px-20 lg:px-32  font-blod text-sm lg:text-xl">JOIN AS A DONOR</button></Link>
      <Link to='/search_donor'><button className="btn bg-blue-300 border-none px-20 lg:px-32 font-blod text-sm lg:text-xl">SEARCH DONOR</button></Link>
    </div>
  </div>
</div>
    );
};

export default Banner;