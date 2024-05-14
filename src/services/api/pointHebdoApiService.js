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
    static async getByIdIn(idList) {
        const token = store.state.auth.token;
        return await ApiService.post(`${PointHebdoApiService.servicePath}/export`,idList, token);
    }

    static async update(projetHebdo) {
        const token = store.state.auth.token;
        return await ApiService.put(`${PointHebdoApiService.servicePath}`, projetHebdo, token);
    }

    static async validate(projetHebdo) {
        const token = store.state.auth.token;
        return await ApiService.put(`${PointHebdoApiService.servicePath}/valide`, projetHebdo, token);
    }

    static async getAllLight() {
        const token = store.state.auth.token;
        return await ApiService.get(`${PointHebdoApiService.servicePath}/light`, token);
    }

}