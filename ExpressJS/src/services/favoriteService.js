const Favorite = require('../models/favorite');
const { default: product } = require('../models/product');

const getFavoritesByUser = async (userId, limit, page) => {
    // nếu trong favorite thì mỗi sản phẩm có thêm isFavorite: true
    const skip = (page - 1) * limit;
    const favorite = await Favorite.findOne({ user: userId }).populate('products').lean();
    if (favorite) {
        return {
            products: favorite.products.slice(skip, skip + limit).map(product => ({
                ...product,
                isFavorite: true
            })),
            total: favorite.products.length,
            page,
            totalPages: Math.ceil(favorite.products.length / limit),
        };
    }
};

const addFavorite = async (userId, productId) => {
    const favorite = await Favorite.findOne({ user: userId });
    if (favorite) {
        // Nếu đã có danh sách yêu thích, thêm sản phẩm vào
        favorite.products.push(productId);
        await favorite.save();
        return favorite;
    } else {
        // Nếu chưa có, tạo mới
        const newFavorite = await Favorite.create({
            user: userId,
            products: [productId]
        });
        return newFavorite;
    }
};

const removeFavorite = async (userId, productId) => {
    const favorite = await Favorite.findOne({ user: userId });
    if (favorite) {
        // Nếu đã có danh sách yêu thích, xóa sản phẩm khỏi
        favorite.products.pull(productId);
        await favorite.save();
        return favorite;
    }
    return null;
};

module.exports = {
    getFavoritesByUser,
    addFavorite,
    removeFavorite
};