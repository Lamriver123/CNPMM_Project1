const Review = require("../models/review");

const getReviewsByProduct = async (productId) => {
  try {
    console.log("Fetching reviews for product:", productId);

    const reviews = await Review.find({ product: productId })
      .populate("user", "name avatar") // user có field name + avatar
      .exec();

    console.log("reviews:", reviews);

    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) /
        (reviews.length || 1);

    return { reviews, averageRating: Number(averageRating.toFixed(1)) };
  } catch (error) {
    console.error("getReviewsByProduct error:", error);
    throw new Error("Error fetching reviews: " + error.message);
  }
};



const addReview = async (userId, productId, rating, comment) => {
    const newReview = new Review({
        user: userId,
        product: productId,
        rating,
        comment
    });
    await newReview.save();
    return newReview;
};

module.exports = {
    getReviewsByProduct,
    addReview
};
