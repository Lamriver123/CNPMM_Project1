const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
} = require("../controllers/userController");

const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const auth = require("../middlewares/auth");
const delay = require("../middlewares/delay");

const routerAPI = express.Router();

// API products (lazy loading)
routerAPI.get('/products', productController.getProducts);

// API categories
routerAPI.get('/categories', categoryController.getCategories);

// API filter
routerAPI.get('/products/filter', productController.filterProducts);
// middleware auth cho tất cả API trừ auth endpoints
routerAPI.use(auth);

// test API
routerAPI.get("/", (req, res) => {
  return res.status(200).json("Hello world api");
});

// API auth
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

// API user
routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);

module.exports = routerAPI; //export default