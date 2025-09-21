import { Card } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";

const { Meta } = Card;

const CardProduct = ({ product, onClick, onToggleFavorite }) => {

  const [isFavorite, setIsFavorite] = useState(product.isFavorite);

  const handleFavorite = (e) => {
    e.stopPropagation(); // tránh trigger click mở chi tiết
    setIsFavorite((prev) => !prev);
    onToggleFavorite?.(product, !isFavorite);
  };

  return (
    <Card
      hoverable
      style={{ position: "relative" }}
      cover={
        <img
          alt={product.name}
          src={product.images || "https://via.placeholder.com/200"}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
      onClick={() => onClick(product)}
    >
      {/* Nút trái tym */}
      <div
        onClick={handleFavorite}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          fontSize: 20,
          color: isFavorite ? "red" : "gray",
          cursor: "pointer",
        }}
      >
        {isFavorite ? <HeartFilled /> : <HeartOutlined />}
      </div>

      <Meta
        title={product.name}
        description={<span style={{ color: "red" }}>{product.price.toLocaleString()} VNĐ</span>}
      />
      <p>Tồn kho: {product.stock}</p>
      <p>Đã bán: {product.sold}</p>
    </Card>
  );
};

export default CardProduct;
