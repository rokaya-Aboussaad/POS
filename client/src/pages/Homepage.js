import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Boissons");
  
  const categories = [
    {
      name: "Boissons",
      imageUrl:
        "https://aspq.org/app/uploads/2020/06/aspq_illustration-boissons-sucre.png",
    },
    {
      name: "Produits Laitiers",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgQkMrXKObEE2LAkbfviWul-91y7Spwe35xw&s",
    },
    {
      name: "Fruits et légumes",
      imageUrl:
        "https://i0.wp.com/hortimedia.ma/wp-content/uploads/2022/05/Fruits-et-legumes.png?fit=1500%2C700&ssl=1",
    },
    {
      name: "Viandes et poissons",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl2FWBgQswpUqHFoLAQ5OpfR41b7KZEroq1A&s",
    },
    {
      name: "Produits de boulangerie",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2I7P8Fjomc7pt3hiGGdt_vvADaSkTKAPVbg&s",
    },
    {
      name: "Céréales et grains",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu6TLaS6YmtbMBla7zMjavwsHdGc8SUyqrYg&s",
    },
    {
      name: "Produits sucrés",
      imageUrl:
        "https://cdn.snrtnews.com/sites/default/files/2022/03/08/crocodiles-marshmallows-schtroumpfs-voici-les-sucreries-les-moins-caloriques-consommer-sans-moderation-presque-1646781749.jpeg",
    },
  ];

  const dispatch = useDispatch();
  
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);
  
  return (
    <DefaultLayout>
      <div className="category-container">
        <div className="category-scroll">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`d-flex category ${
                selectedCategory === category.name && "category-active"
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <h4>{category.name}</h4>
              <img
                src={category.imageUrl}
                alt={category.name}
                height="40"
                width="60"
              />
            </div>
          ))}
        </div>
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => (
            <Col key={item.id} xs={24} lg={6} md={12} sm={6}>
              <ItemList item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;