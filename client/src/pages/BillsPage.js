import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Button, Modal, Table } from "antd";
import "../styles/InvoiceStyles.css";

const BillsPage = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const columns = [
    { title: "ID", dataIndex: "_id" },
    { title: "Customer Name", dataIndex: "customerName" },
    { title: "Contact No", dataIndex: "customerNumber" },
    { title: "Subtotal", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];
console.log(selectedBill)
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Liste des factures</h1>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />
      {popupModal && selectedBill && (
        <Modal
          width={400}
          title="Détails de la facture"
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
            setSelectedBill(null);
          }}
          footer={false}
        >
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>BPS Maroc</h2>
                <p>Contact: 0632 | Casablanca</p>
              </div>
            </center>
            <div id="mid">
              <div className="mt-2">
                <p>
                Nom du client : <b>{selectedBill.customerName}</b>
                  <br />
                  Numéro de téléphone : <b>{selectedBill.customerNumber}</b>
                  <br />
                  Date:{" "}
                  <b>{new Date(selectedBill.date).toLocaleDateString()}</b>
                  <br />
                  Heure:{" "}
                  <b>{new Date(selectedBill.date).toLocaleTimeString()}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Article</h2>
                      </td>
                      <td className="hours">
                        <h2>Quantité</h2>
                      </td>
                      <td className="rate">
                        <h2>Prix</h2>
                      </td>
                      <td className="rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems &&
                      selectedBill.cartItems.map((item) => (
                        <tr key={item.name} className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem hours">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem rate">
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      ))}
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Tax</h2>
                      </td>
                      <td className="payment">
                        <h2>{selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Total Final</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>{selectedBill.totalAmount}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="legalcopy">
                <p className="legal">
                  <strong> Merci pour votre commande !</strong>
                  Application de la TVA de 10 % sur le montant total. Veuillez noter que ce montant n'est pas remboursable. Pour toute assistance, veuillez envoyer un e-mail.
                  <b> r.ab@gmail.com</b>
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
            Print
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
