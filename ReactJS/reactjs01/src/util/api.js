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

export const getFavorites = async (page = 1, limit = 4) => {
  const res = await axios.get(`/v1/api/favorites?page=${page}&limit=${limit}`);
  return res;
};
export const addFavoriteApi = async (productId) => {
  return await axios.post("/v1/api/favorites", {
    productId,
  });
};

export const removeFavoriteApi = async (productId) => {
  return await axios.delete("/v1/api/favorites", {
    data: { productId }, // DELETE phải để body trong data
  });
};

export const getProductDetail = async (id) => {
  const res = await axios.get(`/v1/api/products/${id}`);
  return res;
};

export const getSimilarProducts = async (categoryId) => {
  const res = await axios.get(`/v1/api/products/similar/${categoryId}`);
  return res;
};

    

export const getComments = async (productId) => {
  const res = await axios.get(`/v1/api/reviews/${productId}`);
  return res;
};

const getViewed = async (page = 1, limit = 4) => {
  const res = await axios.get(`/v1/api/viewed?page=${page}&limit=${limit}`);
  return res;
}


export {
    getCategories,
    getProducts,
    createUserApi,
    loginApi,
    getUserApi,
    filterProducts,
    getViewed,
};