import { axiosClient } from "./Link";
const BusinessAPI = {
  add(product) {
    const url = `/business`;
    return axiosClient.post(url, product);
  },
};
export default BusinessAPI;
