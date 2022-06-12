import React from "react";
import { Container, Table } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

function ListProducts() {
  const [data, loading] = useFetch("http://rafeeqma.tk/api/");
  console.log(data);
  return (
    <Container className="p-1 p-md-5 table-responsive-sm">
      {loading && <h1>loading...</h1>}
      {data && (
        <Table className="" striped border={2}>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Code</th>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{item.productCode}</td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ListProducts;
