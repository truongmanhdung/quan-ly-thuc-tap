import { axiosClient } from "./Link";
const TimeApi = {
    setTimeDate(data) {
        const url = `/settime`;
        return axiosClient.post(url, data);
    },
};
export default TimeApi;