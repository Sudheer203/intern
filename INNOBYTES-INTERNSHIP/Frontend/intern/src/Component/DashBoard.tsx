import React , {useRef, useState} from "react";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
















const DashBoard : React.FC = () =>{
    const dominesRef = useRef<HTMLDivElement>(null);

    const showDomine = () => {
      if (dominesRef.current) {
        dominesRef.current.scrollIntoView({ behavior: "smooth", });
      }
    };

    const ShowHomeref = useRef<HTMLDivElement>(null) 

    const ShowHome = () =>{
        if(ShowHomeref.current){
            ShowHomeref.current.scrollIntoView({behavior:"smooth"})
        }
    }

     const naviagteTo = useNavigate()

     const HandleProfile = () =>{
        naviagteTo('/profile')
     }
    

    return (
        <div className="">
            <div className="flex justify-between bg-teal-100 border-zinc-300 h-16 items-center sticky top-0 z-50  ">
             <div className="flex items-center">
             <img src="./intern3.jpg" alt="" className=" rounded-full h-14 w-14  p-1 ml-3" />
             <h4 className=" md:text-2xl font-serif ">TEAM WORK</h4>
             </div>
             <div className="">
             <ul className=" space-x-3 flex mr-4 text-xl font-serif cursor-pointer items-center">
                    <li className="cursor-pointer" onClick={ShowHome}>HOME</li>
                    <li className="cursor-pointer" onClick={showDomine}>DOMINES</li>
                   <img src="./intern2.jpg" alt="" className=" rounded-full w-12 h-12" onClick={HandleProfile}  />
                </ul>
             </div>
            </div>
            <Home dominesRef={dominesRef} ShowHomeref={ShowHomeref}/>

           
        </div>
    )
}

export default DashBoard