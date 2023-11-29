import { Outlet } from "react-router-dom";
import Navbar from "../sheredpage/Navbar";
import Footer from "../sheredpage/Footer";

const Mainlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Mainlayout;