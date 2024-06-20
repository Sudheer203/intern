import React, { useEffect, useState } from 'react';
import AxiosApi ,{URL}from '../AxiosApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


interface ICustomer {
    _id?:string
    firstname?: string;
    email?: string;
    MobileNumber?: string;
    Profile?: string;
}
const UserProfile: React.FC = () => {
    
    const [data,setdata] = useState<ICustomer| null>(null)

    const Users = localStorage.getItem('Login')
    const user = Users ? JSON.parse(Users) : null

    const profile = async() =>{
        try{
            const response = await AxiosApi.get(`/Api/customer/profile/${user._id}`)
            console.log(response,"data")
            setdata(response.data.Customer)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        profile()
    },[])

    const naviageTo = useNavigate()

    const handledelete = async(id:any)=>{
        try{
            
            const responce = await AxiosApi.delete(`/Api/customer/profile/${id}`)
            console.log(responce ,"delete the account ")
            toast.success(responce.data.message)
            naviageTo('/')

        }catch(error){
            console.log(error)
        }
    }






    return (
        <div className="">

        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10">
        {data && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex items-center p-6">
                        <img
                            className="h-20 w-20 rounded-full object-cover"
                            src={`${URL}/Customers/${data.Profile}`}
                            alt="Profile"
                        />
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold">{data.firstname}</h2>
                            <p className="text-gray-600">{data.email}</p>
                            <p className="text-gray-600">{data.MobileNumber}</p>
                        </div>
                    </div>
                    <div className="flex justify-end p-6 space-x-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                        onClick={()=>naviageTo(`/update/${data._id}`)}
                        >
                            Update
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none" onClick={()=>handledelete(data._id)}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>

        
        </div>
    );
};

export default UserProfile;
