import Product from "../models/product.js";
import ProductUtils from "../utils/productUtils.js";
import mongoose from "mongoose";

const getProductsByCategory = async (categoryId, page, limit) => {
  const skip = (page - 1) * limit;

  const filter = {};
  if (categoryId) {
    filter.category = new mongoose.Types.ObjectId(categoryId);
  }

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("category")
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter),
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
      .lean(),
    Product.countDocuments(),
  ]);

  return {
    products,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

// dùng cho fuzzy search + filter
const getFilteredProductsService = async (filters) => {
  const allProducts = await Product.find().populate("category").lean();
  const filteredProducts = ProductUtils.search(allProducts, filters);

  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 8;
  const skip = (page - 1) * limit;

  return {
    products: filteredProducts.slice(skip, skip + limit),
    total: filteredProducts.length,
    page,
    totalPages: Math.ceil(filteredProducts.length / limit),
  };
};

export { getProductsByCategory, getAllProducts, getFilteredProductsService };
