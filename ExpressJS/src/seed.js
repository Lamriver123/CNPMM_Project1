import mongoose from "mongoose";
import Product from "./models/product.js";
import Category from "./models/category.js";

const MONGO_DB_URL = "mongodb://localhost:27017/baitap4cnpmm";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Xoá dữ liệu cũ
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Tạo 5 danh mục
    const categories = await Category.insertMany([
      { name: "Điện thoại", description: "Các loại smartphone" },
      { name: "Laptop", description: "Máy tính xách tay" },
      { name: "Tablet", description: "Máy tính bảng" },
      { name: "Phụ kiện", description: "Phụ kiện điện tử" },
      { name: "Đồng hồ", description: "Đồng hồ thông minh" },
    ]);

    console.log("✅ Categories created");

    // Tạo 15 sản phẩm (3 sản phẩm / danh mục)
    const products = [];
    categories.forEach((cat) => {
      for (let i = 1; i <= 3; i++) {
        products.push({
          name: `${cat.name} ${i}`,
          price: Math.floor(Math.random() * 1000) + 100,
          stock: Math.floor(Math.random() * 50) + 10,
          category: cat._id,
          description: `Sản phẩm ${i} thuộc danh mục ${cat.name}`,
          images: "https://via.placeholder.com/200",
        });
      }
    });

    await Product.insertMany(products);

    console.log("✅ 15 products created");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
