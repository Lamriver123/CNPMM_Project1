import { useEffect, useState, useRef, useCallback } from "react";
import { getFavorites, addFavoriteApi, removeFavoriteApi, getViewed } from "../util/api"; // API gọi favorites
import { Row, Col, Spin, notification } from "antd";
import CardProduct from "../components/cards/cardProduct";

const ViewedPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loaderRef = useRef(null);

  const fetchViewed = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const res = await getViewed(pageNum, 4);
      if (res.success) {
        if (append) {
          setProducts((prev) => [...prev, ...res.data.products]);
        } else {
          setProducts(res.data.products);
        }
        setTotalPages(res.data.totalPages);  
        setPage(res.data.page);
      }
    } catch (err) {
      notification.error({ message: err.message || "Lỗi khi load viewed" });
    } finally {
      setLoading(false);
    }
  };


  // Scroll observer
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && page < totalPages) {
        fetchViewed(page + 1, true);
      }
    },
    [loading, page, totalPages]
  );

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
      fetchViewed(1, false);
    } catch (err) {
      alert(`Lỗi yêu thích: ${err.message}`);
    }
  };

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    fetchViewed(1, false);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Sản phẩm đã xem</h1>

      <Row gutter={[16, 16]}>
        {products.map((p) => (
          <Col key={p._id} span={6}>
            <CardProduct
              product={p}
              onClick={() => notification.info({ message: `Chi tiết ${p.name}` })}
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

export { ViewedPage };
