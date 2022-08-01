import { axiosClient } from "./Link";
const ReportFormAPI = {
  uploadReport(data) {
    const url = `/report`;
    return axiosClient.patch(url, data);
  },
  uploadForm(data) {
    console.log("url", axiosClient.defaults.baseURL)
    const url = `/form`;
    return axiosClient.put(url, data);
  },
};
export default ReportFormAPI;
