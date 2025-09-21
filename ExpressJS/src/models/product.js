import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String },
    images: { type: String },
    isFavorite: { type: Boolean, default: false }, // dùng để đánh dấu sản phẩm yêu thích
    discount: { type: Number, default: 0 },   // % khuyến mãi
    views: { type: Number, default: 0 },      // lượt xem
    rating: { type: Number, default: 0 },     // điểm đánh giá trung bình
    sold: { type: Number, default: 0 },       // số lượng đã bán
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
