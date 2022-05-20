import axios from 'axios';
import Settings from './Settings';
import { toast } from 'react-toastify';


class APIBase {

    appName = process.env.REACT_APP_APP_NAME;
    apiUrl = process.env.REACT_APP_ENDPOINT;
    axiosApi = null;
    settings = null;

    constructor() {
        this.settings = new Settings();

        this.axiosApi = axios.create({
            baseURL: this.apiUrl,
            headers: {'Accept': 'application/json'},
        });

        this.axiosApi.interceptors.request.use((config) => {
            if (this.settings.isAuthenticated()) {
                config.headers.Authorization = 'Bearer ' + this.settings.getToken();
            }
            return config;
          });

        this.axiosApi.interceptors.response.use(function (response) {
            return response.data;
        }, function (error) {
            toast.error(error.response.data.message, { autoClose: 5000, closeOnClick: true, pauseOnHover: true});
            return Promise.reject(error.response.data);
        });
    }

    get(endpoint, params = null) {
        if (params) {
            return this.axiosApi.get(endpoint, { params: params });
        }
        return this.axiosApi.get(endpoint);
    }

    post(endpoint, params) {
        return this.axiosApi.post(endpoint, params);
    }

    patch(endpoint, params) {
        return this.axiosApi.patch(endpoint, params);
    }

    delete(endpoint, params = null) {
        if (params) {
            return this.axiosApi.delete(endpoint, { params: params });
        }
        return this.axiosApi.delete(endpoint);
    }
}
export default APIBase
