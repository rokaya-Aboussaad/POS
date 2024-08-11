import React, { useState } from "react";
import { Button, Card, InputNumber } from "antd";
import { useDispatch } from "react-redux";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1); // État local pour la quantité

  // Mise à jour du gestionnaire de panier avec la quantité spécifiée
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity }
    });
  };

  const { Meta } = Card;

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        style={{ width: 240 }}
        cover={<img alt={item.name} src={item.image} style={{ height: 200 }} />}
      >
        <Meta
          title={item.name}
          description={`Prix: ${item.price} MAD`}
        />
        <div style={{ marginTop: 10 }}>
          <span style={{ marginRight: 10 }}>Quantité:</span>
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={(value) => setQuantity(value)}
          />
        </div>
        <div style={{ marginTop: 10, textAlign: "center" }}>
          <Button type="primary" onClick={handleAddToCart}>Add To Cart</Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
