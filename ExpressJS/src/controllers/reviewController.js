const reviewService = require("../services/reviewService");

const getReviewsByProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { reviews, averageRating } = await reviewService.getReviewsByProduct(productId);
        return res.status(200).json({
            success: true,
            data: reviews,
            rating: averageRating
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user.userId;
        const newReview = await reviewService.addReview(userId, productId, rating, comment);
        return res.status(200).json({
            success: true,
            message: "Thêm đánh giá thành công",
            data: newReview
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }   
};

module.exports = {
    getReviewsByProduct,
    addReview
};