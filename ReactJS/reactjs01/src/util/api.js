import axios from "./axios.customize";

const createUserApi = (name, email, password) => {
    const URL_API = "/v1/api/register";
    const data = {
        email,
        password,
        name,
    };
    return axios.post(URL_API, data);
};

const loginApi = (email, password) => {
    const URL_API = "/v1/api/login";
    const data = {
        email,
        password,
    };
    return axios.post(URL_API, data);
};

const getUserApi = () => {
    const URL_API = "/v1/api/user";
    return axios.get(URL_API);
};

const getProducts = (categoryId = null, page = 1, limit = 5) => {
  let url = `/v1/api/products?page=${page}&limit=${limit}`;
  if (categoryId && categoryId !== "all") {
    url += `&categoryId=${categoryId}`;
  }
  return axios.get(url);
};


const getCategories = () => {
  return axios.get("/v1/api/categories");
};

const filterProducts = (params = {}, page = 1, limit = 5) => {
  const query = new URLSearchParams(params).toString();
  return axios.get(`/v1/api/products/filter?page=${page}&limit=${limit}&${query}`);
};


export {
    getCategories,
    getProducts,
    createUserApi,
    loginApi,
    getUserApi,
    filterProducts
};