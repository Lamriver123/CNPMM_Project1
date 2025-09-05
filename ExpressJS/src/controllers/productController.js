const productService = require('../services/productService');

const getProducts = async (req, res) => {
  try {
    const categoryId = req.query.categoryId || null;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let result;
    if (categoryId && categoryId !== "all") {
      // Lọc theo category
      result = await productService.getProductsByCategory(categoryId, page, limit);
    } else {
      // Lấy tất cả
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
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getProducts,
};
