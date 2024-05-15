import ApiService from "@/services/api/apiService.js";
import store from "@/store/store.js";

export default class UserApiService {

    static servicePath = '/user';

    static async getAllActive() {
        const token = store.state.auth.token;
        return await ApiService.get(`${UserApiService.servicePath}/active`, token);
    }

    static async getAll() {
        const token = store.state.auth.token;
        return await ApiService.get(`${UserApiService.servicePath}`, token);
    }

    static async create(userData) {
        const token = store.state.auth.token;
        return await ApiService.post(`${UserApiService.servicePath}`, userData, token);
    }

    static async archive(id) {
        const token = store.state.auth.token;
        return await ApiService.put(`${UserApiService.servicePath}/archive/${id}`, token);
    }

    static async update(user) {
        const token = store.state.auth.token;
        return await ApiService.put(`${UserApiService.servicePath}`, user, token);
    }

    static async getAllArchived() {
        const token = store.state.auth.token;
        return await ApiService.get(`${UserApiService.servicePath}/archived`, token);
    }


}