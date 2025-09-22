import Product from "../models/product.js";
import ProductUtils from "../utils/productUtils.js";
import Favorite from "../models/favorite.js";
import Viewed from "../models/viewed.js";
import mongoose from "mongoose";

const getProductsByCategory = async (categoryId) => {

  const filter = {};
  if (categoryId) {
    filter.category = new mongoose.Types.ObjectId(categoryId);
  }

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("category")
      .lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    total,
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
const getFilteredProductsService = async (filters, userId) => {
  
  const allProducts = await Product.find().populate("category").lean();
  const filteredProducts = ProductUtils.search(allProducts, filters);

  // đánh dấu sản phẩm yêu thích nếu userId được cung cấp
  if (userId) {
    const favorite = await Favorite.findOne({ user: userId }).lean();
    const favoriteProductIds = favorite ? favorite.products.map((id) => id.toString()) : [];
    filteredProducts.forEach((product) => {
      product.isFavorite = favoriteProductIds.includes(product._id.toString());
    });
  }

    
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

const getProductById = async (productId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return null;
  }

  const product = await Product.findById(productId).populate("category").lean();

  if (userId && product) {
    const viewed = await Viewed.findOne({ user: userId }).lean();
    if (viewed) {
      //
      if (!viewed.products.map((id) => id.toString()).includes(productId)) {
        viewed.products.push(productId);
        await Viewed.updateOne({ user: userId }, { products: viewed.products });
      }
    }
    else {
      await Viewed.create({
        user: userId, products: [productId]
      });
    }
  }
  return product;
};

export { getProductsByCategory, getAllProducts, getFilteredProductsService, getProductById };
