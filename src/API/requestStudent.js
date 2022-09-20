import { axiosClient } from "./Link";
const requestApi = {
  requestOfStudent(data) {
    const url = `/request`;
    return axiosClient.post(url,data);
  },
  getRequestOfStudent(){
    const url = '/getRequest'
    return axiosClient.get(url)
  },
  resetStudentRequest(val){
    const url = '/resetStudent'
    return axiosClient(url, val)
  }


};
export default requestApi;
