import { axiosClient } from "./Link";
const DataAPI = {
    getAll() {
        const url = `/data`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/data/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/data`;
        return axiosClient.post(url, data);
    },
    remove(id) {
        const url = `/data/${id}`;
        return axiosClient.delete(url);
    },

};
export default DataAPI;