import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
import spinner from "./spinner";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); // État pour le prix total

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // Calcul du prix total des articles dans le panier
  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.price * item.quantity; // Multiplication du prix par la quantité
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  // Mise à jour du local storage lorsque le panier change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {loading && <spinner />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h1 className="text-center text-light font-weight-bold mt-4">BPS</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Accueil</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Factures</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Articles</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<TeamOutlined />}>
            <Link to="/customers">Clients</Link>
          </Menu.Item>

          <Menu.Item key="/users" icon={<UserOutlined />}>
            <Link to="/users">Utilisateurs</Link>
          </Menu.Item>

          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
          >
            Déconnexion
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <div
            className="cart-item d-flex justify-content-space-between flex-row"
            onClick={() => navigate("/cart")} // Correction de la gestion de l'événement onClick
          >
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
          <div className="total-price">
            Prix Total: {totalPrice.toFixed(2)} MAD{" "}
            {/* Affichage du prix total */}
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
