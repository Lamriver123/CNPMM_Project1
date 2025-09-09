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

const filterProducts = async (req, res) => {
  try {
    const result = await productService.getFilteredProductsService(req.query);
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export { getProducts, filterProducts };
