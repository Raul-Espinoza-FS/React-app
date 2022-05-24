import Cookies from 'js-cookie';

class Settings {

    user = null;
    permissions = null;
    token = null;

    constructor() {
        try {
            this.user = JSON.parse(Cookies.get('user'));
            this.permissions = JSON.parse(Cookies.get('permissions'));
            this.token = Cookies.get('token');
        }
        catch (e) {
            this.user = null;
            this.permissions = null;
            this.token = null;
        }
    }

    /**
     * Token
     * ######################################################################################
     */
    setToken(token) {
        this.token = token;
        Cookies.set('token', token, { path: '/', expires: 7 });
    }

    getToken() {
        return this.token;
    }

    isAuthenticated() {
        if (this.getToken() && this.getPermissions() && this.getUser()) {
            return true;
        }
        return false;
    }

    deleteToken() {
        return Cookies.remove('token', { path: '/' });
    }

    // ######################################################################################

    /**
     * User
     * ######################################################################################
     */
    setUser(user) {
        this.user = user;
        Cookies.set('user', JSON.stringify(user), { path: '/', expires: 7 });
    }

    getUser() {
        return this.user;
    }
    // ######################################################################################


    /**
     * Permissions
     * ######################################################################################
     */
    setPermissions(permissions) {
        this.permissions = permissions;
        Cookies.set('permissions', JSON.stringify(permissions), { path: '/', expires: 7 });
    }

    getPermissions() {
        return this.permissions;
    }

    can(name) {
        if (this.permissions.some(e => e.name === name)) {
            return true;
        }
        return false;
    }
    // ######################################################################################


    clearSettings() {
        Cookies.remove('token', { path: '/' });
        Cookies.remove('user', { path: '/' });
        Cookies.remove('permissions', { path: '/' });
    }
}
export default Settings
