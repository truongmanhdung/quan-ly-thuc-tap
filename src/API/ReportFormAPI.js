import { axiosClient } from "./Link";
const ReportFormAPI = {
  uploadReport(data) {
    const url = `/report-form`;
    return axiosClient.patch(url, data);
  },
};
export default ReportFormAPI;
