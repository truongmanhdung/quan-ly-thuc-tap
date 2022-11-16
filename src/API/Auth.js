import { axiosClient } from "./Link";
const AuthApi = {
    login(data) {
        console.log(data)
        const url = `/login-google`;
        return axiosClient.post(url, data);
    },
    logout(){
        const url = `/logout`;
        return axiosClient.get(url);
    }
};
export default AuthApi;