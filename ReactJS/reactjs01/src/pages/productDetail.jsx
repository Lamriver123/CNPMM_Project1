// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Row, Col, Spin, List, Avatar, Carousel  } from "antd";
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
  const [comments, setComments] = useState([]);
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
          console.log(">>> check resComments: ", resComments);
          if (resComments.success) {
            setComments(resComments.data);
          }
          else {
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

  if (loading) return <Spin />;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  return (
    <div style={{ padding: 20 }}>
      {/* Thông tin sản phẩm */}
      <Card
        title={product.name}
        cover={<img alt={product.name} src={product.images} />}
        style={{ marginBottom: 30 }}
      >
        <p>
          <b>Giá:</b> {product.price.toLocaleString()} VNĐ
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
      </Card>

      {/* Sản phẩm tương tự */}
      <h2 style={{ marginBottom: 16 }}>Sản phẩm tương tự</h2>
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
              //onClick={onProductClick}
              onToggleFavorite={(prod, fav) => {
                console.log("Toggle favorite", prod.name, fav);
              }}
            />
          </div>
        ))}
      </Carousel>

      {/* Bình luận */}
      <h2 style={{ marginBottom: 16 }}>Bình luận</h2>
      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(cmt) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar>
                  {cmt.user?.name?.[0]?.toUpperCase() || "U"}
                </Avatar>
              }
              title={cmt.user?.name || "Người dùng ẩn danh"}
              description={cmt.content}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export { ProductDetailPage };
