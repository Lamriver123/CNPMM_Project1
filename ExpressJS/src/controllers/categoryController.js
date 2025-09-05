const categoryService = require('../services/categoryService');

const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();

        return res.status(200).json({
            success: true,
            data: categories
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    getCategories
};
