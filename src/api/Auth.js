import APIBase from "./APIBase";

class Auth extends APIBase {

    login(username, password) {
        return new Promise((resolve, reject) => {
           this.post('login', {
                'email': username,
                'password': password,
                'app_name': this.appName,
            }).then((data) => {
                this.settings.setToken(data.token);
                this.settings.setUser(data.name);
                this.settings.setPermissions(data.roles);
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            })
        })
    }

    logout() {
        return new Promise((resolve, reject) => {
            this.post('logout', {
                 'app_name': this.appName,
             }).then((data) => {
                 this.settings.clearSettings();
                 resolve(data);
             })
             .catch((error) => {
                 reject(error);
             })
         })
    }
}
export default Auth
