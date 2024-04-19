import ApiService from "@/services/api/apiService.js";
import store from "@/store/store.js";

export default class TestApiService {

    static servicePath = '/test';

    static async getAll() {
        const token = store.state.auth.token;
        return await ApiService.get(`${TestApiService.servicePath}`, token);
    }

    static async getById(id) {
        const token = store.state.auth.token;
        return await ApiService.post(`${TestApiService.servicePath}/${id}`, token);
    }

    static async searchByContent(content) {
        const token = store.state.auth.token;
        return await ApiService.post(`${TestApiService.servicePath}/content/${id}`, token);
    }
}