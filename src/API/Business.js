import { stringify } from "qs";
import { axiosClient } from "./Link";
const BusinessAPI = {
  add(product) {
    const url = `/business`;
    return axiosClient.post(url, product);
  },
  create(data) {
    const url = `/business/new`;
    return axiosClient.post(url, data);
  },
  get(range) {
    const url = `/business?${stringify(range)}`;
    return axiosClient.get(url);
  },
  delete(id) {
    const url = `/business/${id}`;
    return axiosClient.delete(url);
  },
  patch(params, id) {
    const url = `/business/${id}`;
    return axiosClient.delete(url, params);
  },
};
export default BusinessAPI;
