import Product from "../models/product.js";


const getProductsByCategory = async (categoryId, page, limit) => {
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find({ category: categoryId })
      .populate("category")
      .skip(skip)
      .limit(limit)
      .exec(),
    Product.countDocuments({ category: categoryId }),
  ]);

  return {
    products,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

const getAllProducts = async (page, limit) => {
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find()
      .populate("category")
      .skip(skip)
      .limit(limit)
      .exec(),
    Product.countDocuments(),
  ]);

  return {
    products,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

export { getProductsByCategory, getAllProducts };

