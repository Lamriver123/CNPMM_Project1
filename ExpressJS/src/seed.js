import mongoose from "mongoose";
import Product from "./models/product.js";
import Category from "./models/category.js";
import Review from "./models/review.js";
import Order from "./models/order.js";
import Favorite from "./models/favorite.js";
import User from "./models/user.js"; // cần có user

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
    await Review.deleteMany({});
    await Order.deleteMany({});
    await Favorite.deleteMany({});

    // Tạo 1 user mẫu nếu chưa có
    let user = await User.findOne();
    if (!user) {
      user = await User.create({
        name: "Test User",
        email: "test@example.com",
        password: "123456", // nhớ hash sau nếu làm auth thật
      });
    }

    // Tạo 5 danh mục
    const categories = await Category.insertMany([
      { name: "Điện thoại", description: "Các loại smartphone" },
      { name: "Laptop", description: "Máy tính xách tay" },
      { name: "Tablet", description: "Máy tính bảng" },
      { name: "Phụ kiện", description: "Phụ kiện điện tử" },
      { name: "Đồng hồ", description: "Đồng hồ thông minh" },
    ]);

    console.log("✅ Categories created");

    // Tạo 7 sản phẩm / danh mục
    const products = [];
    categories.forEach((cat) => {
      for (let i = 1; i <= 7; i++) {
        products.push({
          name: `${cat.name} ${i}`,
          price: Math.floor(Math.random() * 1000) + 100,
          stock: Math.floor(Math.random() * 50) + 10,
          category: cat._id,
          description: `Sản phẩm ${i} thuộc danh mục ${cat.name}`,
          images: `https://picsum.photos/200?random=${Math.floor(
            Math.random() * 1000
          )}`,
          discount: Math.floor(Math.random() * 50),
          views: Math.floor(Math.random() * 500),
        });
      }
    });

    const createdProducts = await Product.insertMany(products);

    console.log("✅ Products created");

    // ------------------ SEED REVIEW ------------------
    const reviews = [];
    createdProducts.slice(0, 10).forEach((prod) => {
      reviews.push({
        product: prod._id,
        user: user._id,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: `Đánh giá cho ${prod.name}`,
      });
    });
    await Review.insertMany(reviews);
    console.log("✅ Reviews created");

    // ------------------ SEED ORDER ------------------
    const orders = [];
    for (let i = 0; i < 5; i++) {
      const randomProducts = createdProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, 3); // chọn 3 sản phẩm ngẫu nhiên

      const items = randomProducts.map((p) => ({
        product: p._id,
        quantity: Math.floor(Math.random() * 3) + 1,
        isCommented: false,
      }));

      const totalAmount = items.reduce(
        (sum, item) => sum + item.quantity * randomProducts.find(p => p._id.equals(item.product)).price,
        0
      );

      orders.push({
        user: user._id,
        items,
        totalAmount,
        statusPayment: "paid",
        statusOrder: "completed",
      });
    }
    await Order.insertMany(orders);
    console.log("✅ Orders created");

    // ------------------ SEED FAVORITE ------------------
    const favorite = await Favorite.create({
      user: user._id,
      products: createdProducts.slice(0, 5).map((p) => p._id), // 5 sản phẩm yêu thích
    });
    console.log("✅ Favorite created");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
