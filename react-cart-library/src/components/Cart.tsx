import React, { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Input } from "./Input";

type Item = { id: number; name: string; quantity: number };

export const Cart: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (!newItem) return;
    setItems([...items, { id: Date.now(), name: newItem, quantity: 1 }]);
    setNewItem("");
  };

  const updateQuantity = (id: number, qty: number) => {
    setItems(items.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div>
      <h2>Giỏ hàng</h2>
      <Input value={newItem} onChange={setNewItem} />
      <Button onClick={addItem}>Thêm sản phẩm</Button>

      {items.map(item => (
        <Card key={item.id}>
          <p>{item.name}</p>
          <Input value={String(item.quantity)} onChange={(val) => updateQuantity(item.id, Number(val))} />
          <Button onClick={() => removeItem(item.id)}>Xóa</Button>
        </Card>
      ))}
    </div>
  );
};
