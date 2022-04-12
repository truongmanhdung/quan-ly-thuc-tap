import { axiosClient } from "./Link";
const TimeApi = {
    setTimeDate(data) {
        const url = `/settime`;
        return axiosClient.post(url, data);
    },
    getTimeForm(data){
        const url = `/settime/${data}`;
        return axiosClient.get(url);
    }
};
export default TimeApi;