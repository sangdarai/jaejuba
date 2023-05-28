import axios from "axios";

const API = axios.create({
    baseURL : "https://www.jaejuba.com:4000",
    headers : {
        'Content-Type': 'application/json',
    } ,
}) ;

export default API;