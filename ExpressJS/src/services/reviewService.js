const Review = require("../models/review");

const getReviewsByProduct = async (productId) => {
    try {
    const reviews = await Review.find({ product: productId })
        .populate('user', 'username avatar') // Lấy thông tin user (username, avatar)
        .exec();
        const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
        return { reviews, averageRating };
    } catch (error) {
        throw new Error("Error fetching reviews");
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
