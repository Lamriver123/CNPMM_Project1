const favoriteService = require("../services/favoriteService");

const getFavorites = async (req, res) => {
    try {
        console.log(">>> check user in favoriteController: ", req.user.userId);
        const limit = parseInt(req.query.limit) || 4;
        const page = parseInt(req.query.page) || 1;

        const favorites = await favoriteService.getFavoritesByUser(req.user.userId, limit, page);

        return res.status(200).json({
            success: true,
            data: favorites || { products: [] }  // fallback nếu user chưa có favorite
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const addFavorite = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.userId;
        const updatedFavorites = await favoriteService.addFavorite(userId, productId);
        return res.status(200).json({
            success: true,
            message: "Thêm sản phẩm vào danh sách yêu thích thành công",
            data: updatedFavorites
        });
    } catch (err) {
        return res.status(500).json({
            success: false, 
            message: err.message
        });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.userId;
        const updatedFavorites = await favoriteService.removeFavorite(userId, productId);
        return res.status(200).json({
            success: true,
            message: "Xóa sản phẩm khỏi danh sách yêu thích thành công",
            data: updatedFavorites
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    getFavorites,
    addFavorite,
    removeFavorite
};