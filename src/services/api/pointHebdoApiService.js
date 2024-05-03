import ApiService from "@/services/api/apiService.js";
import store from "@/store/store.js";

export default class PointHebdoApiService{

    static servicePath = '/point-hebdo';

    static async create(projetHebdoData) {
        const token = store.state.auth.token;
        return await ApiService.post(`${PointHebdoApiService.servicePath}`, projetHebdoData, token);
    }

    static async getAll() {
        const token = store.state.auth.token;
        return await ApiService.get(`${PointHebdoApiService.servicePath}`, token);
    }

    static async getById(id) {
        const token = store.state.auth.token;
        return await ApiService.get(`${PointHebdoApiService.servicePath}/${id}`, token);
    }
}