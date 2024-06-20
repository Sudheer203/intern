import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";

interface HomeProps {
    dominesRef: React.RefObject<HTMLDivElement>;
    ShowHomeref:React.RefObject<HTMLDivElement>
  }


const Home : React.FC <HomeProps>= ({dominesRef,ShowHomeref}) =>{
    
    const [home,sethome] = useState<boolean>(false)

    const ShowHome = () =>{
        sethome(true)
    }

    return (
        <div className="">
            <div ref={ShowHomeref} className="md:flex w-auto lg:h-[90vh]">
                <div className=" w-[50] flex-wrap mt-40 p-2 ml-3 ">
                    <p className=" text-2xl text-justify">The MERN stack is a JavaScript-based framework for web development comprising MongoDB, Express.js, React.js, and Node.js, enabling developers to build full-stack applications with a single language.</p>
                    <h3 className=" text-3xl mt-2 ml-6 italic text-red-500 font-bold">INTERN SHIP</h3>
                </div>
                <div className="">
                    <img src="./intern.jpg" alt="" className="" />
                </div>
            </div>
            <div  ref={dominesRef} className=" flex h-[600px] w-auto bg-gradient-to-tl from-lime-200 via-sky-500 to-violet-500 p-5">
            <div className=" w-[300px] bg-slate-50  rounded-3xl ml-16 items-center justify-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ZYtHv2OLXmthRPbkmENZRXuqBVDwlsrZ1A&s" alt=""  className=" ml-20 mt-2 rounded-full w-32 h-32 items-center hover:shadow-lg hover:shadow-black  "/>
                <h3 className=" ml-20 text-2xl mt-2 font-serif">MONGO <span>DB</span></h3>
                <p className="p-2 mt-2 mb-4 text-justify">MongoDB is built on a scale-out architecture that has become popular with developers of all kinds for developing scalable applications with evolving data schemas. As a document database, MongoDB makes it easy for developers to store structured or unstructured data. It uses a JSON-like format to store documents.</p>

                {/* <p className="p-2 mt-2 ml-2 items-center self-start">MongoDB is built on a scale-out architecture that has become popular with developers of all kinds for developing scalable applications with evolving data schemas. As a document database, MongoDB makes it easy for developers to store structured or unstructured data. It uses a JSON-like format to store documents.</p> */}
                <Link  to="https://www.mongodb.com/"  className=" border  bg-gradient-to-tl from-blue-600 via-blue-400 to-blue-600 w-16 h-14 rounded-md bg-black text-white font-serif p-2 ml-2 mt-7 text-xl hover:transform hover:translate-y-3" target="_blank">START THE TUTORIAL<i className="fa-solid fa-arrow-right text-white text-xl  p-2 "></i></Link>
            </div>
            <div className=" w-[300px] bg-slate-50  rounded-3xl ml-5">
            <img src="./express.png" alt=""  className=" ml-20 mt-2 rounded-full w-32 h-32 items-center hover:shadow-lg hover:shadow-black  "/>
                <h3 className=" ml-20 text-2xl mt-2 font-serif">EXPRESS <span>JS</span></h3>
                <p className="p-2 mt-2 ml-2 text-justify"> Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application. It's a layer built on the top of the Node js that helps manage servers and routes</p>
                <Link  to="https://expressjs.com/" target="_blank" className=" border bg-gradient-to-tl from-blue-600 via-blue-400 to-blue-600 w-16 h-14 rounded-md bg-black text-white font-serif p-2 ml-2 mt-7 text-xl hover:transform hover:translate-y-3">START THE TUTORIAL<i className="fa-solid fa-arrow-right text-white text-xl mt-9 p-2 "></i></Link>
            </div>
            <div className=" w-[300px] bg-slate-50  rounded-3xl ml-5">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSoW3g9hjXIasgon-kpzz-lD9z4SsalyPbZA&s" alt=""  className=" ml-20 mt-2 rounded-full w-32 h-32 items-center hover:shadow-lg hover:shadow-black  "/>
                <h3 className=" ml-20 text-2xl mt-2 font-serif">REACT <span>JS</span></h3>
                <p className="p-2 mt-2 ml-2 text-justify">React. js is an open-source JavaScript library, crafted with precision by Facebook, that aims to simplify the intricate process of building interactive user interfaces. Imagine a user interface built with React as a collection of components, each responsible for outputting a small, reusable piece of HTML code.</p>
                <Link  to="https://react.dev/" target="_blank" className="  bg-gradient-to-tl from-blue-600 via-blue-400 to-blue-600 w-16 h-14 rounded-md bg-black text-white font-serif p-2 ml-2 mt-7 text-xl hover:transform hover:translate-y-3">START THE TUTORIAL<i className="fa-solid fa-arrow-right text-white text-xl mt-3 p-2 "></i></Link>
                
            </div>
            <div className=" w-[300px] bg-slate-50  rounded-3xl ml-5">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-bSt16XVIR9526s9Rs6OUTds5FV8oZ_vX1w&s" alt=""  className=" ml-20 mt-2 rounded-full w-32 h-32 items-center hover:shadow-lg hover:shadow-black  "/>
                <h3 className=" ml-20 text-2xl mt-2 font-serif">NODE <span>JS</span></h3>
                <p className="p-2 mt-2 ml-2 text-justify">Node.js is an open-source, cross-platform JavaScript runtime environment and library for running web applications outside the client's browser. Ryan Dahl developed it in 2009, and its latest iteration, version 15.14, was released in April 2021</p>
                <Link  to="https://nodejs.org/en" target="_blank" className=" bg-gradient-to-tl from-blue-600 via-blue-400 to-blue-600 w-16 h-14 rounded-md bg-black text-white font-serif p-2 ml-2 mt-7 text-xl hover:transform hover:translate-y-3">START THE TUTORIAL<i className="fa-solid fa-arrow-right text-white text-xl mt-14 p-2 "></i></Link>
                
            </div>

</div>

{/* About Page */}
{/* <div  className="md:flex w-auto lg:h-[90vh]  mt-5">
                <div className=" w-[50] flex-wrap mt-40 p-2 ml-3 ">
                    <p className=" text-2xl text-justify">The MERN stack is a JavaScript-based framework for web development comprising MongoDB, Express.js, React.js, and Node.js, enabling developers to build full-stack applications with a single language.</p>
                    <h3 className=" text-3xl mt-2 ml-6 italic text-red-500 font-bold">INTERN SHIP</h3>
                </div>
                <div className=" w-[50] ">
                    <img src="./intern5.png" alt="" className=" w-[1700px] h-[600px] bg-blend-color-burn" />
                </div>
            </div> */}

                
                
           

        </div>

    )
}


export default Home