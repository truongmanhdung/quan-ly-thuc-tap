import { axiosClient } from "./Link";
const RegisterInternAPI = {
  upload(data) {
    const url = `/intern/support`;
    return axiosClient.post(url, data);
  },
};
export default RegisterInternAPI;
