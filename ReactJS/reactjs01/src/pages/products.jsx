import { useEffect, useState, useRef, useCallback } from "react";
import { getCategories, filterProducts,addFavoriteApi, removeFavoriteApi } from "../util/api";
import { Row, Col, Spin, notification, Select, Input, Button, InputNumber } from "antd";
import CardProduct from "../components/cards/cardProduct"; // import component mới
import { useNavigate } from "react-router-dom";


const { Option } = Select;

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loaderRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      if (res.success) setCategories(res.data);
    } catch {
      notification.error({ message: "Không load được danh mục" });
    }
  };

  const fetchProducts = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory !== "all") params.category = selectedCategory;
      if (keyword) params.keyword = keyword;
      if (priceMin > 0) params.priceMin = priceMin;
      if (priceMax > 0) params.priceMax = priceMax;

      const res = await filterProducts(params, pageNum, 4);
      if (res.success) {
        if (append) {
          setProducts((prev) => [...prev, ...res.products]);
        } else {
          setProducts(res.products);
        }
        setTotalPages(res.totalPages);
        setPage(res.page);
      }
    } catch (err) {
      notification.error({ message: err.message || "Lỗi khi gọi API" });
    } finally {
      setLoading(false);
    }
  };

  // Scroll observer
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && page < totalPages) {
        fetchProducts(page + 1, true);
      }
    },
    [loading, page, totalPages]
  );

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Reset page khi filter thay đổi
  useEffect(() => {
    fetchProducts(1, false);
  }, [selectedCategory, keyword, priceMin, priceMax]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handler khi click card => mở chi tiết
  const handleOpenDetail = (product) => {
    alert(`Mở chi tiết sản phẩm: ${product.name}`);
    navigate(`/products/${product._id}`);
    // hoặc navigate đến trang chi tiết bằng react-router-dom
    // navigate(`/product/${product._id}`);
  };

  // Handler thêm/xóa yêu thích
  const handleToggleFavorite = async (product) => {
    try {
      if (!product.isFavorite) {
        // thêm
        await addFavoriteApi(product._id);
        alert(`Đã thêm "${product.name}" vào yêu thích`);
      } else {
        // xóa
        await removeFavoriteApi(product._id);
        alert(`Đã xóa "${product.name}" khỏi yêu thích`);
      }
      // reload lại danh sách sản phẩm
      fetchProducts(1, false);
    } catch (err) {
      alert(`Lỗi yêu thích: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Danh sách sản phẩm</h1>

      {/* Bộ lọc */}
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          style={{ width: 200 }}
        >
          <Option value="all">Tất cả</Option>
          {categories.map((cat) => (
            <Option key={cat._id} value={cat._id}>
              {cat.name}
            </Option>
          ))}
        </Select>

        <Input
          placeholder="Tìm theo tên/mô tả"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 200 }}
        />

        <InputNumber
          placeholder="Giá tối thiểu"
          value={priceMin}
          onChange={setPriceMin}
        />
        <InputNumber
          placeholder="Giá tối đa"
          value={priceMax}
          onChange={setPriceMax}
        />

        <Button type="primary" onClick={() => fetchProducts(1, false)}>
          Lọc
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {products.map((p) => (
          <Col key={p._id} span={6}>
            <CardProduct
              product={p}
              onClick={handleOpenDetail}
              onToggleFavorite={handleToggleFavorite}
            />
          </Col>
        ))}
      </Row>

      {loading && <Spin />}
      <div ref={loaderRef} />
    </div>
  );
};

export { ProductPage };
