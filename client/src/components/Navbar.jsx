import { Link } from "react-router-dom";
import React from "react";
import imgLogo from "../assets/img-nav-footer/logosara.png";
import imgicon2 from "../assets/img-nav-footer/icon2.png";
import imgicon from "../assets/img-nav-footer/icon.png";



const Navbar = () => {

  return (
    
      <>
        
        <nav className="flex flex-col fixed bg-[#0f192eff] w-full text-[#4281a4ff] p-20 columns-3 gap-8">
        <div className="flex flex-col items-center gap-8 p-2 m-4 border-[#f5f5f5ff] bg-[#0f192eff] text-[#4281a4ff] hover:bg-[#0f192eff] hover:text-[#4281a4ff] w-[1060px]">
        </div>
        <div className="flex flex-col items-center gap-8 p-2 m-4 border-[#f5f5f5ff] bg-[#0f192eff] text-[#4281a4ff] hover:bg-[#0f192eff] hover:text-[#4281a4ff] w-[1060px]">
          
            
            <button>Search here!</button>
            
          
        </div>
        <div className="flex flex-col items-center gap-8 p-2 m-4 border-[#f5f5f5ff] bg-[#0f192eff] text-[#4281a4ff] hover:bg-[#0f192eff] hover:text-[#4281a4ff] w-[1060px]">
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
        <div className="flex flex-col items-center gap-8 p-2 m-4 border-[#f5f5f5ff] bg-[#0f192eff] text-[#4281a4ff] hover:bg-[#0f192eff] hover:text-[#4281a4ff] w-[1060px]">
          <h1></h1>
          <h2></h2>
          <img src={imgLogo} />
        </div>
        <div className="flex flex-col items-center gap-8 p-2 m-4 border-[#f5f5f5ff] bg-[#0f192eff] text-[#4281a4ff] hover:bg-[#0f192eff] hover:text-[#4281a4ff] w-[1060px]">
          <div>
          <span className="p-4 margin-4  flex flex-row ">
            <img src={imgicon} className="p-20 w-50" alt="logo" />
            <Link to="/">Home</Link>
          </span>
        </div>
        <div>
          <span className="p-4 margin-4  flex flex-row ">
            <img src={imgicon2} className="p-20 w-50" alt="logo" />
            <Link to="/login">Login</Link>
          </span>
        </div>
        <div>
          <span className="p-4 margin-4 bg-[#0f192eff] text-[#4281a4ff] flex flex-row ">
            <img src={imgicon} className="p-20 w-50" alt="logo" />
            <Link to="/register">Register</Link>
          </span>
        </div>
        </div>
      </nav>
    </>
  )
}
export default Navbar;