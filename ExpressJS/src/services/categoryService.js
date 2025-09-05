const Category = require('../models/category');

const getAllCategories = async () => {
    const categories = await Category.find().exec();
    return categories;
};

module.exports = {
    getAllCategories
};
