import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

function SpecificProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getproduct/${id}`);
        // console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="mt-5 text-center">
        <p>Product not found.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={product.product_image} alt={product.name} />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{product.company}</Card.Title>
              <Card.Text>
                <strong>Category:</strong> {product.product_category}<br />
                <strong>Company:</strong> {product.company}<br />
                <strong>Price:</strong> ${product.product_price}<br />
                <strong>Rating:</strong> {product.rating} stars<br />
                <strong>Discount:</strong> {product.discount}%<br />
                <strong>Availability:</strong> {product.availability ? 'In Stock' : 'Out of Stock'}<br />
                <strong>Description:</strong> {product.detailed_description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SpecificProductDetail;
