import React from "react";
import { Link } from "react-router-dom";
const MyNavbar = () => {
  
    return(
        <>
        <nav className="flex fixed bg-cyan-950 w-full text-blue-300 p-20 columns-3 gap-8">
    <div className="p-4 margin-4 flex text-blue-300 w-100">
        
    
            <span className="w-20 flex flex-col align-items">
      
              <button className="p-4 margin-4 text-slate-600 bg-blue-300 hover:bg-blue-300 hover:text-cyan-950 rounded-xl underline italic decoration-wavy">button
                <span className="w-10">
                  <img src="../../public/images/icon2.png" className="bg-slate-300 p-2 w-10" alt="logo" />
                </span>
              </button>
              <button className="p-4 margin-4 text-slate-600 bg-blue-300 hover:bg-blue-300 hover:text-cyan-950 rounded-xl underline italic decoration-wavy">button
                <span className="w-10">
                  <img src="../../public/images/icon.png" className="bg-slate-300 p-2 w-10" alt="logo" />
                </span>
              </button>
              <button className="p-4 margin-4 text-slate-600 bg-blue-300 hover:bg-blue-300 hover:text-cyan-950 rounded-xl italic underline decoration-wavy">button
                <span className="w-10">
                  <img src="../../public/images/icon2.png" className="bg-slate-300 p-2 w-10" alt="logo" />
                </span>
              </button>
              <button className="p-4 margin-4 text-slate-600 bg-blue-300 hover:bg-blue-300 hover:text-cyan-950 italic rounded-xl underline decoration-wavy">button
                <span className="w-10">
                  <img src="../../public/images/icon.png" className="bg-slate-300 p-2 w-10" alt="logo" />
                </span>
              </button>
            </span>
          </div>
          <div className="p-4 margin-4 flex flex-col text-blue-300">
            <h1 className="flex flex-col bg-cyan-950 text-blue-300 p-2 text-transform: uppercase Roboto">Aquatic Paradise</h1>
            <img src="../../public/images/logotop.jpg" className="bg-slate-300 p-2 w-50" alt="logotop" />
            <p className="text-transform: uppercase Roboto">ten years in one click </p>
            </div>
          <div>
                    <span className="p-4 margin-4  flex flex-row justify-center ">
                        <img src="../../public/images/icon.png" className="p-20 w-50" alt="logo" />
                    <Link to="/">Home</Link>
                    </span>
                </div>
                <div>
                <span className="p-4 margin-4  flex flex-row justify-center ">
                    <img src="../../public/images/icon.png" className="p-20 w-50" alt="logo" />
                    <Link to="/login">Login</Link>
                    </span>
                </div>
                <div>
                <span className="p-4 margin-4  flex flex-row justify-center ">
                    <img src="../../public/images/icon.png" className="p-20 w-50" alt="logo" />
                    <Link to="/register">Register</Link>
                    </span>
                    </div>
                    </nav>
            </>
    )
} 
export default MyNavbar;
