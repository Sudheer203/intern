import React from "react";


const Login : React.FC = () =>{
    return(
        <div className=" fixed top-0 left-0 bg-black opacity-50">
            <div className=" items-center justify-items-center w-80 h-[300px]">
            <form >
          <label htmlFor="username">Email:</label>
          <input type="text" id="username" name="username" required />
          <label htmlFor="username">Password:</label>
          <input type="text" id="username" name="username" required />
          <button type="submit">Login</button>
        </form>

            </div>


        </div>

    )
}



export default Login