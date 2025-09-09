import { useEffect, useState, useRef, useCallback } from "react";
import { getCategories, filterProducts } from "../util/api";
import { Card, Row, Col, Spin, notification, Select, Input, Button, InputNumber } from "antd";

const { Option } = Select;

const ProductPage = () => {
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
            <Option key={cat._id} value={cat._id}>{cat.name}</Option>
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
            <Card
              hoverable
              cover={
                <img
                  alt={p.name}
                  src={p.images || "https://via.placeholder.com/200"}
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
            >
              <Card.Meta
                title={p.name}
                description={<span style={{ color: "red" }}>{p.price.toLocaleString()} VNĐ</span>}
              />
              <p>Tồn kho: {p.stock}</p>
              <p>Danh mục: {p.category?.name}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {loading && <Spin />}
      <div ref={loaderRef} />
    </div>
  );
};

export { ProductPage };
