import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class AuthService {
    login (email, password) {

        return axios
            .post(API_URL + "login", {
                email,
                password,
            })
            .then(response => {
                if(response.data.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(name, email, password, c_password) {
        return axios
            .post(API_URL + "register/", {
                name,
                email,
                password,
                c_password,
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
        
    }
}

export default new AuthService();