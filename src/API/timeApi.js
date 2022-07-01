import { axiosClient } from "./Link";
const TimeApi = {
    setTimeDate(data) {
        const url = `/settime`;
        return axiosClient.post(url, data);
    },
    getTimeForm(data){
        const string = `typeNumber=${data.typeNumber}&semester_id=${data.semester_id}`
        const url = `/settime/find-one?${string}`;
        return axiosClient.get(url);
    },
    getListTime(semester_id){
        const url = `/settime?semester_id=${semester_id}`;
        return axiosClient.get(url);
    }
};
export default TimeApi;