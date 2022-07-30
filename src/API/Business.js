import { stringify } from "qs";
import { axiosClient } from "./Link";
const BusinessAPI = {
  add(product) {
    const url = `/business`;
    return axiosClient.post(url, product);
  },
  get(range){
    console.log(range);
    const url = `/business?${stringify(range)}`
    return axiosClient.get(url)
  },
};
export default BusinessAPI;
