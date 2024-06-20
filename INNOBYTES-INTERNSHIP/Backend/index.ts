import  Express , {urlencoded , json} from "express";
import mongoose  from "mongoose";
import cors from "cors";
import bodyParser  from "body-parser";
import cookieParser from "cookie-parser";
import Customer from "./Controller/Customer"

const PORT =3500
const app = Express()
app.use(Express.json())
app.use(Express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your front-end origin
    credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));
app.use('/Customers',Express.static('Customers'))

const Server = () =>{
    try{
        mongoose.connect("mongodb://localhost:27017/interns").then(()=>{
            console.log('mongodb is connected');
            app.listen(PORT, ()=>{
                console.log(`server is running this ${PORT}`)
            })
        })

    }catch(error){
        console.log(error)
    }
}

app.use('/Api/customer',Customer)
Server()


export default app