import { axiosClient } from "./Link";
const requestApi = {
  requestOfStudent(data) {
    const url = `/request`;
    return axiosClient.post(url,data);
  },

};
export default requestApi;
