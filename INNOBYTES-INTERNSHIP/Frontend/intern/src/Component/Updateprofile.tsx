import React ,{useState} from "react";
import AxiosApi from "../AxiosApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface register{
    email?:string
    password?:string
    MobileNumber?:string
    firstname?:string
  }

const Updateprofile : React.FC = ()=>{
    const {id} = useParams()
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
          const response = await AxiosApi.put(`/Api/customer/profile/${id}`, formData);
          toast.success(response.data.message)
          const data = response.data?.NewCustomer
          
          console.log(response);
        } catch (error) {
          console.log(error);
          console.log(error.response.data.message)
          toast.error(error.response.data.message)      
        }
      }

      const navigateTo = useNavigate()
    return (
        <div className="">
            <div className="flex h-full w-full items-center justify-center">
              <div className="bg-white rounded-lg shadow-md px-8 py-6 max-w-md w-full">
                <form>
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
                <button  className="text-gray-500 mt-4 hover:underline"
                onClick={()=>navigateTo('/dash')}
                >
                  Close
                </button>
              </div>
              <div className="hidden md:block absolute right-0 top-0 h-full w-1/2 bg-cover bg-center" style={{ backgroundImage: "url(./login-image.jpg)" }}>
                {/* Optional: Add a subtle overlay or text over the image for readability */}
              </div>
            </div>
        </div>

    )
}


export default Updateprofile