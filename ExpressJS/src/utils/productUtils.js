import Fuse from "fuse.js";

class ProductUtils {
    /**
     * Fuzzy search + filter sản phẩm
     * @param {Array<Object>} products - Mảng sản phẩm
     * @param {Object} dto - SearchProductDto
     * @returns {Array<Object>} - Kết quả đã lọc và fuzzy search
     */
    static search(products, dto = {}) {
        const {
            keyword,
            category,   // chỉ 1 category
            priceMin = 0,
            priceMax = Number.MAX_SAFE_INTEGER,
            stockMin = 0,
        } = dto;

        let results = products;

        // 1. Fuzzy search
        if (keyword) {
            const fuse = new Fuse(results, { keys: ["name", "description"], threshold: 0.3 });
            results = fuse.search(keyword).map(r => r.item);
        }

        // 2. Filter
        results = results.filter(p => {
            let matchCategory = true;
            if (category) {
                // category có thể là _id hoặc object populate
                matchCategory =
                    String(p.category?._id || p.category) === String(category);
            }
            
            const matchPrice = p.price >= priceMin && p.price <= priceMax;
            const matchStock = p.stock >= stockMin;
            return matchCategory && matchPrice && matchStock;
        });

        return results;
    }
}

export default ProductUtils;
