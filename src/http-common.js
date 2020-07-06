import axios from "axios";
import authHeader from './services/auth-header';

// console.log(authHeader().Authorization);

export default axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Conten-type": "application/json",
        "Authorization": authHeader().Authorization,
    }
});