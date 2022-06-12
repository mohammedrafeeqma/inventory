import './addproducts.css'
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";

function AddProducts() {
  const [size, setSize] = useState(1);
  const [array, setArray] = useState([]);
  const [error, setError] = useState();

  const handleOnchange = (e, index) => {
    const { name, value } = e.target;
    let temp_array = [...array];
    let temp_element = { ...temp_array[index] };
    temp_element[name] = value;
    temp_array[index] = temp_element;
    setArray(temp_array);
  };

  const validation = (e) => {
    let er = array.find((data) => {
      if (data.productCode === "" || data.productName === "") {
        return data;
      }
      return null
    });
    if (er) {
      setError("please fill all the field");
    } else {
      setError("");
      handleSubmit(e);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(array);
    const res = await axios.post("http://127.0.0.1:3001//api/", array);
    if (res) {
      window.location.reload();
    }
    console.log(res);
  };
  useEffect(() => {
    let l = parseInt(size);
    l > 0 &&
      setArray(
        new Array(l).fill({ productCode: "", productName: "", quantity: "1" })
      );
  }, [size]);
  return (
    <Container>
      <Row>
        <Col md={4}>
          {error && (
            <Alert className="mt-2" variant="danger">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
      <Form as={Row} className="mb-5 d-flex align-items-end">
        <Form.Group as={Col} md={4}>
          <Form.Label>No. of items going to add</Form.Label>
          <Form.Control
            min={1}
            type="number"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
          />
        </Form.Group>
      </Form>
      <Form>
        {array &&
          array.map((data, i) => {
            return (
              <Row key={i} className="mb-3">
                <Col lg={4}>
                  <Form.Group as={Col} onSubmit={handleSubmit}>
                    <Form.Label>Product Code</Form.Label>
                    <Form.Control
                      name="productCode"
                      type="number"
                      onChange={(e) => handleOnchange(e, i)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid state.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Col}>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      name="productName"
                      onChange={(e) => handleOnchange(e, i)}
                    />
                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      min={0}
                      name="quantity"
                      type="number"
                      onChange={(e) => handleOnchange(e, i)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            );
          })}
        <Button
          onClick={validation}
          variant="success"
          className="mb-3 ps-3 pe-3"
        >
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default AddProducts;
