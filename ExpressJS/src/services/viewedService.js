const Viewed = require('../models/viewed');
const Favorite = require('../models/favorite')

const getViewedByUser = async (userId, page, limit) => {
    // nếu trong favorite thì mỗi sản phẩm có thêm isFavorite: true
    // phân trang
    

    const viewed = await Viewed.findOne({ user: userId })
        .populate('products')
        .exec();

    

    const skip = (page - 1) * limit;
    const favorite = await Favorite.findOne({ user: userId }).lean();
    const favoriteProductIds = favorite ? favorite.products.map((id) => id.toString()) : [];
    viewed.products.forEach((product) => {
        product.isFavorite = favoriteProductIds.includes(product._id.toString());
    });

    return {
        products: viewed ? viewed.products.slice(skip, skip + limit) : [],
        total: viewed ? viewed.products.length : 0,
        page,
        totalPages: viewed ? Math.ceil(viewed.products.length / limit) : 0,
    };
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