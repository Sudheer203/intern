import React ,{useRef,useState}from "react";
import Home from "./Home";
import AxiosApi from "../AxiosApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface register{
  email?:string
  password?:string
  MobileNumber?:string
  firstname?:string
}

const Navbar : React.FC = () =>{
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

   //Login
   const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
   const loginRef = useRef<HTMLDivElement>(null);

   const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const [register , setregister] = useState<boolean>(false)
  const regis = useRef<HTMLDivElement>(null);


  const handleregister = () =>{
    setregister(true)
  }


//    OTP VERIFICATION 
  const [verification , setverification] =  useState<boolean>(false)

  const otp = useRef<HTMLDivElement>(null)

  const otpverification = () =>{
     setverification(true)
     setIsLoginOpen(false)
  }



//backned connection to frontend

const [data,setdata] = useState<register>({
  email:'',
  password:'',
  MobileNumber:'',
  firstname:''
})


const HandleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
  const {name,value} = e.target
  setdata({...data,[name]:value})
}

const [image,setimage] = useState<File | null >(null)

const HandleImage = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const files = e.target.files && e.target.files[0]
    setimage(files)
  
}


const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('MobileNumber', data.MobileNumber);
  formData.append('firstname', data.firstname);
  formData.append('Profile',image as File)
  try {
    const response = await AxiosApi.post('/Api/customer/register', formData);
    toast.success(response.data.message)
    const data = response.data?.NewCustomer
    localStorage.setItem('User',JSON.stringify(data))
    setverification(true)
    setregister(false)
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}



//VERIFICATION OTP

const [otps,setotps] = useState<string>('')
const Users = localStorage.getItem("User")
const User = Users ? JSON.parse(Users) : null
console.log(User,"users")



const Verificationemail = async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  try{
    console.log(otps,"getting opt",User)
    
    const response = await AxiosApi.post('/Api/customer/verify',{email:User.email,code:otps})
    console.log(response,"getting the response")
    toast.success(response.data.message)
    setverification(false)
  }catch(error){
    console.log(error.response.data.message,"error message")
    toast.error(error.response.data.message)
    
  }
}


//RESEND OTP
const resendotp =async (e:React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault()
  try{
    console.log(User.email)
     const response = await AxiosApi.post('/Api/customer/resend',
      {email:User.email})
    toast.success(response.data.message)
    setverification(true)
     console.log(response,"getting the opt resend")
  }catch(error){
    console.log(error)
  }
}


//LOGIN 

const [logindata, setlogindata] = useState<register>({
  email:'',
  password:''
});

const HandleChanges = (e:React.ChangeEvent<HTMLInputElement>) =>{
  const {name,value} = e.target
  setlogindata({...logindata,[name]:value})
}


const naviageTo = useNavigate()
const hanldlelogin = async(e:React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault()
  try{
    const response = await AxiosApi.post('/Api/customer/login',{
      email:logindata.email,
      password:logindata.password
    })
    console.log(response,"login response")
    const names = JSON.stringify(response.data.Customers)
     names ? localStorage.setItem('Login',names) : null
    toast.success(response.data.message)
    naviageTo('/dash')
  }catch(error){
    console.log(error)
    toast.error(error.response.data.message)
  }

}














    return(
        <div className=" ">
            <div className="flex justify-between bg-teal-100 border-zinc-300 h-16 items-center sticky top-0 z-50  ">
             <div className="flex items-center">
             <img src="./intern3.jpg" alt="" className=" rounded-full h-14 w-14  p-1 ml-3" />
             <h4 className=" md:text-2xl font-serif ">TEAM WORK</h4>
             </div>
             <div className="">
                <ul className=" space-x-3 flex mr-4 text-xl font-serif cursor-pointer">
                    <li className="cursor-pointer" onClick={ShowHome}>HOME</li>
                    <li className="cursor-pointer" onClick={showDomine}>DOMINES</li>
                    <li className="cursor-pointer" onClick={handleLoginClick}>LOGIN</li>
                    <li className="cursor-pointer" onClick={handleregister}>REGISTER</li>
                </ul>
             </div>
            </div>
            <Home dominesRef={dominesRef} ShowHomeref={ShowHomeref}/>

            {/* LOGIN */}
            {isLoginOpen && (
        <div
          ref={loginRef}
          className={`fixed top-0 left-0 w-full h-screen bg-slate-950 opacity-75 transition-opacity duration-300 ease-in-out z-50 ${
            isLoginOpen ? "opacity-95" : "opacity-0"
          }`}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="bg-white rounded-lg shadow-md px-8 py-6 max-w-md w-full">
              <form onSubmit={hanldlelogin}>
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <label htmlFor="username">Email:</label>
                <input
                  type="email"
                  id="username"
                  name="email"
                  onChange={HandleChanges}
                  required
                  className="block w-full px-3 py-2 mb-3 rounded-md border outline-none focus:border-teal-500 focus:ring-teal-500"
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={HandleChanges}
                  required
                  className="block w-full px-3 py-2 mb-3 rounded-md border outline-none focus:border-teal-500 focus:ring-teal-500"
                />
                <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                  Login
                </button>
              </form>
              <button onClick={handleCloseLogin} className="text-gray-500 mt-4 hover:underline">
                Close
              </button>
            </div>
            <div className="hidden md:block absolute right-0 top-0 h-full w-1/2 bg-cover bg-center" style={{ backgroundImage: "url(./login-image.jpg)" }}>
              {/* Optional: Add a subtle overlay or text over the image for readability */}
            </div>
          </div>
        </div>
      )}
           

           {/* REGISTER */}
           {register && (
            <div
            ref={regis}
            className={`fixed top-0 left-0 w-full h-screen bg-slate-950 opacity-75 transition-opacity duration-300 ease-in-out z-50 ${
              isLoginOpen ? "opacity-95" : "opacity-90"
            }`}
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="bg-white rounded-lg shadow-md px-8 py-6 max-w-md w-full">
                <form  onSubmit={handleRegister}>
                  <h2 className="text-2xl font-semibold mb-4">Login</h2>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={HandleChange}

                    required
                    className="block w-full px-3 py-2 mb-3 rounded-md border outline-none focus:border-teal-500 focus:ring-teal-500"
                  />
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={HandleChange}
                    required
                    className="block w-full px-3 py-2 mb-3 rounded-md border outline-none focus:border-teal-500 focus:ring-teal-500"
                  />
                  <label htmlFor="password">Full Name:</label>
                  <input
                    type="text"
                    id="fullname"
                    onChange={HandleChange}
                    name="firstname"

                    required
                    className="block w-full px-3 py-2 mb-3 rounded-md border outline-none focus:border-teal-500 focus:ring-teal-500"
                  />
                  <label htmlFor="password">MobileNumber:</label>
                  <input
                    type="MobileNumber"
                    id="MobileNumber"
                    name="MobileNumber"
                    onChange={HandleChange}
                    required
                    className="block w-full px-3 py-2 mb-3 rounded-md border outline-none focus:border-teal-500 focus:ring-teal-500"
                  />
                  <label htmlFor="password">Profile:</label>
                  <input
                    type="file"
                    id="Profile"
                    name="Profile"
                    onChange={HandleImage}
                    required
                    className="block w-full px-3 py-2 mb-3 rounded-md border outline-none focus:border-teal-500 focus:ring-teal-500"
                  />
                  <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                    REGISTER
                  </button>
                </form>
                <button onClick={()=>setregister(false)} className="text-gray-500 mt-4 hover:underline">
                  Close
                </button>
              </div>
              <div className="hidden md:block absolute right-0 top-0 h-full w-1/2 bg-cover bg-center" style={{ backgroundImage: "url(./login-image.jpg)" }}>
                {/* Optional: Add a subtle overlay or text over the image for readability */}
              </div>
            </div>
          </div>
           )}


           {/* OTP VERIFICATION */}

          {verification && (
            <div
            ref={loginRef}
            className={`fixed top-0 left-0 w-full h-screen bg-slate-950 opacity-75 transition-opacity duration-300 ease-in-out z-50 ${
              isLoginOpen ? "opacity-95" : "opacity-0"
            }`}
          >
           <div className="flex h-full w-full items-center justify-center">
            <div className="bg-white rounded-lg shadow-md px-8 py-6 max-w-md w-full">
              
              <h2 className="text-2xl font-semibold mb-4">Login</h2>
              {/* Removed form, replace with OTP verification input */}
              <form action="" onSubmit={Verificationemail}>

              <label htmlFor="otp">Enter OTP:</label>
              <input
                id="otp"
                name="otp"
                maxLength={6} // Set maximum length to 6 for 6-digit OTP
                required
                value={otps}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setotps(e.target.value)}
                className="block w-full px-3 py-2 mb-3 rounded-md border outline-none focus:border-teal-500 focus:ring-teal-500"
              />
              <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700"
               >
                Verify OTP
              </button>
              </form>
              <div className=" mt-3">

              <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-950" onClick={resendotp}>
                Resend Otp
              </button>
              </div>

            {/* <button onClick={()=>setIsLoginOpen(true)} className="text-gray-500 mt-4 hover:underline ml-3">
                  Close
                </button> */}
            </div>
            <div className="hidden md:block absolute right-0 top-0 h-full w-1/2 bg-cover bg-center" style={{ backgroundImage: "url(./login-image.jpg)" }}>
              {/* Optional: Add a subtle overlay or text over the image for readability */}
            </div>
          </div>
          </div>
          )
          }







        </div>
    )
}

export default Navbar