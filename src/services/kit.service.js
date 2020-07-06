import http from "../http-common";
import Axios from "axios";

class KitDataService {
    getAll() {
        return http.get(`/kits`);
    }

    get(id) {
        return http.get(`/kits/${id}`);
    }

    create(data) {
        return http.post(`/kits/`, data);
    }

    update(id, data) {
        return http.put(`/kits/${id}`, data);
    }

    delete(id) {
        return http.delete(`kits/${id}`);
    }
}

export default new KitDataService();