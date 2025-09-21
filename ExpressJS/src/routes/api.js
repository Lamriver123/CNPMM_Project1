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
const optionalAuth = require("../middlewares/optionalAuth");
const delay = require("../middlewares/delay");
const favoriteController = require("../controllers/favoriteController");
const viewedController = require("../controllers/viewedController");
const reviewController = require("../controllers/reviewController");
const routerAPI = express.Router();



// API products (lazy loading)
routerAPI.get('/products',optionalAuth, productController.getProducts);

//API products similar
routerAPI.get('/products/similar/:categoryId', productController.getSimilarProducts);

// API reviews
routerAPI.get('/reviews/:productId', reviewController.getReviewsByProduct);

// API categories
routerAPI.get('/categories', categoryController.getCategories);

// API filter
routerAPI.get('/products/filter', optionalAuth, productController.filterProducts);

//API product details
routerAPI.get('/products/:id', productController.getProductById);

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

// API favorite
routerAPI.get("/favorites", favoriteController.getFavorites);
routerAPI.post("/favorites", favoriteController.addFavorite);
routerAPI.delete("/favorites", favoriteController.removeFavorite);

// API viewed
routerAPI.get("/viewed", viewedController.getViewed);
routerAPI.post("/viewed", viewedController.addViewed);

// API reviews
routerAPI.post('/reviews', reviewController.addReview);
module.exports = routerAPI; //export default