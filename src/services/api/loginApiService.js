import ApiService from "@/services/api/apiService.js";

export default class LoginApiService {

    static servicePath = '/login';

    static async login(user) {
        return await ApiService.post(`${LoginApiService.servicePath}`, user);
    }

}