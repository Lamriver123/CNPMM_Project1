const Viewed = require('../models/viewed');

const getViewedByUser = async (userId) => {
    const viewed = await Viewed.findOne({ user: userId })
        .populate('products')
        .exec();
    return viewed;
};

const addViewed = async (userId, productId) => {
    const viewed = await Viewed.findOne({ user: userId });
    if (viewed) {
        // Nếu đã có danh sách đã xem, thêm sản phẩm vào    
        viewed.products.push(productId);
        await viewed.save();
        return viewed;
    } else {
        // Nếu chưa có, tạo mới
        const newViewed = await Viewed.create({
            user: userId,
            products: [productId]
        });
        return newViewed;
    }
};

module.exports = {
    getViewedByUser,
    addViewed
};