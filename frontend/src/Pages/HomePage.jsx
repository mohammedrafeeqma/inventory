import React from "react";
import { Card, Container, Tab, Tabs } from "react-bootstrap";
import AddProducts from "../components/addProducts/AddProducts";
import ListProducts from "../components/listProducts/ListProducts";
import RemoveProducts from "../components/removeProducts/RemoveProducts";

function HomePage() {
  return (
    <Container style={{ backgroundColor: "#98B4D4" }} className="mt-5 p-4">
      <h1
        className="mb-3"
        style={{ textAlign: "center", color: "white", fontStyle: "italic" }}
      >
        Inventory list
      </h1>
      <Card>
        <Tabs
          defaultActiveKey="Add Products"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Add Products" title="Add Products">
            <AddProducts />
          </Tab>
          <Tab eventKey="Remove Products" title="Remove Products">
            <RemoveProducts />
          </Tab>
          <Tab eventKey="List Products" title="List Products">
            <ListProducts />
          </Tab>
        </Tabs>
      </Card>
    </Container>
  );
}

export default HomePage;
