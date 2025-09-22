// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Spin,
  List,
  Avatar,
  Carousel,
  Rate,
  Divider,
} from "antd";
import CardProduct from "../components/cards/cardProduct.jsx";
import {
  getProductDetail,
  getSimilarProducts,
  getComments,
} from "../util/api";

const { Meta } = Card;

const ProductDetailPage = () => {
  const { id } = useParams(); // lấy productId từ URL
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [comments, setComments] = useState([]); // luôn khởi tạo array
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Lấy chi tiết sản phẩm
        const resProduct = await getProductDetail(id);
        if (resProduct.success) {
          setProduct(resProduct.data);

          // 2. Lấy sản phẩm tương tự
          const resSimilar = await getSimilarProducts(
            resProduct.data.category._id
          );
          if (resSimilar.success) {
            setSimilarProducts(
              resSimilar.data.filter((p) => p._id !== id) // loại trừ chính nó
            );
          }

          // 3. Lấy bình luận
          const resComments = await getComments(id);
          if (resComments.success) {
            setComments(resComments.data || []);
            setAverageRating(resComments.rating || 0);
          } else {
            console.log(">>> load comments lỗi: ");
          }
        }
      } catch (err) {
        console.error("Lỗi khi load product detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Spin fullscreen />;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      {/* Thông tin sản phẩm */}
      <Row gutter={24}>
        <Col span={10}>
          <Card
            cover={
              <img
                alt={product.name}
                src={product.images}
                style={{ maxHeight: 400, objectFit: "contain" }}
              />
            }
          />
        </Col>
        <Col span={14}>
          <Card title={product.name}>
            <p>
              <b>Giá:</b>{" "}
              <span style={{ color: "red", fontSize: 20 }}>
                {product.price.toLocaleString()} VNĐ
              </span>
            </p>
            <p>
              <b>Mô tả:</b> {product.description}
            </p>
            <p>
              <b>Danh mục:</b> {product.category?.name}
            </p>
            <p>
              <b>Tồn kho:</b> {product.stock}
            </p>
            <p>
              <b>Đã bán:</b> {product.sold}
            </p>
            <p>
              <b>Lượt xem:</b> {product.views}
            </p>
            <p>
              <b>Giảm giá:</b> {product.discount}%
            </p>

            {/* Rating */}
            <Divider />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Rate disabled allowHalf value={averageRating || 0} />
              <span style={{ fontSize: 16 }}>
                {averageRating?.toFixed(1) || 0}/5 (
                {comments?.length || 0} đánh giá)
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Sản phẩm tương tự */}
      <h2 style={{ margin: "32px 0 16px" }}>Sản phẩm tương tự</h2>
      <Carousel
        dots={false}
        slidesToShow={4}
        slidesToScroll={1}
        infinite={false}
        style={{ marginBottom: 30 }}
      >
        {similarProducts.map((sp) => (
          <div key={sp._id} style={{ padding: "0 8px" }}>
            <CardProduct
              product={sp}
              onToggleFavorite={(prod, fav) => {
                console.log("Toggle favorite", prod.name, fav);
              }}
            />
          </div>
        ))}
      </Carousel>

      {/* Bình luận */}
      <h2 style={{ margin: "32px 0 16px" }}>Đánh giá & Bình luận</h2>
      <List
        itemLayout="vertical"
        dataSource={comments || []}
        renderItem={(cmt) => (
          <List.Item key={cmt._id}>
            <List.Item.Meta
              avatar={
                <Avatar src={cmt.user?.avatar}>
                  {cmt.user?.name?.[0]?.toUpperCase() || "U"}
                </Avatar>
              }
              title={
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{cmt.user?.name || "Người dùng ẩn danh"}</span>
                  <Rate
                    disabled
                    defaultValue={cmt.rating}
                    style={{ fontSize: 14 }}
                  />
                </div>
              }
              description={cmt.comment}
            />
            <div style={{ fontSize: 12, color: "gray" }}>
              {new Date(cmt.createdAt).toLocaleString("vi-VN")}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export { ProductDetailPage };
