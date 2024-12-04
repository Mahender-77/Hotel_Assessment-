import axios from "axios";

const Api= axios.create({
baseURL:"http://localhost:5000/",
});

Api.interceptors.request.use((config)=>{
    config.headers["Content-Type"]="application/json";
    return config
})

Api.interceptors.response.use(
    (response)=>response,
    (error)=>{
    console.error("API error",error.response?.data || error.message)
    return Promise.reject(error)
    }
    )


export default Api