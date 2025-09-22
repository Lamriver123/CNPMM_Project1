import * as productService from "../services/productService.js";

const getProducts = async (req, res) => {
  try {
    const categoryId = req.query.categoryId || null;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    let result;
    if (categoryId && categoryId !== "all") {
      result = await productService.getProductsByCategory(categoryId, page, limit);
    } else {
      result = await productService.getAllProducts(page, limit);
    }

    return res.status(200).json({
      success: true,
      data: result.products,
      pagination: {
        total: result.total,
        currentPage: result.currentPage,
        totalPages: result.totalPages,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//get products similar
const getSimilarProducts = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const result = await productService.getProductsByCategory(categoryId);
    return res.status(200).json({ success: true, data: result.products });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const filterProducts = async (req, res) => {
  try {
    // trong api.js tôi để get product trên routerAPI.use(auth);, làm sao lấy userId
    const userId = req.user ? req.user.userId : null;
    console.log(">>> check userId in productController: ", userId);
    const result = await productService.getFilteredProductsService(req.query, userId);
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//get product details by id
const getProductById = async (req, res) => {
  try {
    const userId = req.user ? req.user.userId : null;
    
    const productId = req.params.id;
    const product = await productService.getProductById(productId, userId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export { getProducts, filterProducts, getSimilarProducts, getProductById };
