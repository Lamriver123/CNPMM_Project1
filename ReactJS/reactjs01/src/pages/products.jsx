import { useEffect, useState, useRef, useCallback } from "react";
import { getProducts, getCategories } from "../util/api";
import { Card, Row, Col, Spin, notification, Select } from "antd";

const { Option } = Select;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null); // ref để quan sát

  // Lấy danh mục
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      if (res.success) {
        setCategories(res.data);
      }
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Không load được danh mục",
      });
    }
  };

  // Lấy sản phẩm
  const fetchProducts = async (pageNumber = 1, categoryId = selectedCategory) => {
    try {
      setLoading(true);
      const res = await getProducts(categoryId !== "all" ? categoryId : null, pageNumber, limit);

      if (res.success) {
        const { data, pagination } = res;

        if (pageNumber === 1) {
          setProducts(data); // load lần đầu hoặc đổi category
        } else {
          setProducts((prev) => [...prev, ...data]); // load thêm
        }

        setTotalPages(pagination.totalPages);
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "Lỗi khi gọi API",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(1);
  }, []);

  // Khi đổi danh mục
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setPage(1);
    fetchProducts(1, value);
  };

  // IntersectionObserver: khi loaderRef hiển thị thì load thêm
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && page < totalPages) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage);
      }
    },
    [loading, page, totalPages]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Danh sách sản phẩm</h1>

      {/* Dropdown chọn danh mục */}
      <div style={{ marginBottom: 20 }}>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ width: 200 }}
        >
          <Option value="all">Tất cả</Option>
          {categories.map((cat) => (
            <Option key={cat._id} value={cat._id}>
              {cat.name}
            </Option>
          ))}
        </Select>
      </div>

      <Row gutter={[16, 16]} justify="center">
        {products.map((product) => (
          <Col key={product._id} flex="0 0 19%">
            <Card
              hoverable
              style={{ height: "100%", borderRadius: 8 }}
              cover={
                <img
                  alt={product.name}
                  src={product.images || "https://via.placeholder.com/200"}
                  style={{
                    height: 200,
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
              }
            >
              <Card.Meta
                title={<span style={{ fontWeight: 600 }}>{product.name}</span>}
                description={
                  <span style={{ color: "#fa541c" }}>
                    {product.price.toLocaleString()} VNĐ
                  </span>
                }
              />
              <p style={{ margin: "8px 0 0" }}>Tồn kho: {product.stock}</p>
              <p style={{ margin: 0, color: "#888" }}>
                Danh mục: {product.category?.name}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Loader hiển thị khi đang tải hoặc còn trang */}
      <div ref={loaderRef} style={{ textAlign: "center", marginTop: 20 }}>
        {loading && <Spin />}
      </div>
    </div>
  );
};

export { ProductPage };
