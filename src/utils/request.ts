import axios from "axios";
import exp from "constants";

export const API =  "https://jsonplaceholder.typicode.com/users"
// create axios request instance
const serviceAxios = axios.create({
    baseURL: API, // base request address
    timeout: 10000,
    withCredentials: false,
});

export default serviceAxios;