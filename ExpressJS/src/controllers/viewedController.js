const viewedService = require("../services/viewedService");

const getViewed = async (req, res) => {
    try {
        console.log(">>> check user in viewedController: ", req.user.userId);
        const limit = parseInt(req.query.limit) || 4;
        const page = parseInt(req.query.page) || 1;
        const viewed = await viewedService.getViewedByUser(req.user.userId, page, limit);
        return res.status(200).json({
            success: true,
            data: viewed || { products: [] }  // fallback nếu user chưa có viewed
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const addViewed = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.userId;
        const updatedViewed = await viewedService.addViewed(userId, productId);
        return res.status(200).json({
            success: true,
            message: "Thêm sản phẩm vào danh sách đã xem thành công",
            data: updatedViewed
        });
    } catch (err) {
        return res.status(500).json({
            success: false, 
            message: err.message
        });
    }   
};

module.exports = {
    getViewed,
    addViewed
};