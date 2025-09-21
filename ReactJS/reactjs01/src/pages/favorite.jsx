import { useEffect, useState, useRef, useCallback } from "react";
import { getFavorites, addFavoriteApi, removeFavoriteApi } from "../util/api"; // API gọi favorites
import { Row, Col, Spin, notification } from "antd";
import CardProduct from "../components/cards/cardProduct";

const FavoritePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loaderRef = useRef(null);

  const fetchFavorites = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const res = await getFavorites(pageNum, 4);
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
      notification.error({ message: err.message || "Lỗi khi load yêu thích" });
    } finally {
      setLoading(false);
    }
  };


  // Scroll observer
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && page < totalPages) {
        fetchFavorites(page + 1, true);
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
      fetchFavorites(1, false);
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
    fetchFavorites(1, false);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Sản phẩm yêu thích</h1>

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

export { FavoritePage };
