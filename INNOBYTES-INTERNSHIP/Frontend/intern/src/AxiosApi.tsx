import axios from 'axios'


export const URL = 'http://localhost:3500'


const AxiosApi = axios.create({
    baseURL:URL,
    withCredentials:true
})


export default AxiosApi