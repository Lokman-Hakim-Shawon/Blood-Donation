import Banner from "./Banner";
import Contact from "./Contact";
import Featurd from "./Featurd";
// import Featurd from "./Featurd";

const Home = () => {
    return (
        <div className="mb-10">
          <Banner></Banner>
          <Featurd></Featurd>
          <Contact></Contact>
        </div>
    );
};

export default Home;