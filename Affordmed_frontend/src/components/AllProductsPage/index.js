import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './index.css';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    rating: '',
    price: '',
    availability: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filterParams = {}) => {
    try {
      const response = await axios.get('http://localhost:5000/getproducts', { params: filterParams });
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = () => {
    fetchProducts(filters);
    setFilters({
      category: '',
      company: '',
      rating: '',
      price: '',
      availability: ''
    });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      company: '',
      rating: '',
      price: '',
      availability: ''
    });
    fetchProducts();
  };

  return (
    <Container>
      <h1 className="my-4">All Products</h1>
      <Form className="mb-4">
        <Row>
          <Col>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="category" value={filters.category} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Electronics">Electronics</option>
                <option value="Computers">Computers</option>
                <option value="Footwear">Footwear</option>
                <option value="Clothing">Clothing</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Books">Books</option>
                <option value="Furniture">Furniture</option>
                <option value="Toys">Toys</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Control as="select" name="company" value={filters.company} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Sony">Sony</option>
                <option value="Bose">Bose</option>
                <option value="HP">HP</option>
                <option value="Dell">Dell</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
                <option value="Reebok">Reebok</option>
                <option value="New Balance">New Balance</option>
                <option value="Under Armour">Under Armour</option>
                <option value="The North Face">The North Face</option>
                <option value="Columbia">Columbia</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control as="select" name="rating" value={filters.rating} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="4">4 stars & up</option>
                <option value="3">3 stars & up</option>
                <option value="2">2 stars & up</option>
                <option value="1">1 star & up</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control as="select" name="price" value={filters.price} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="availability">
              <Form.Label>Availability</Form.Label>
              <Form.Control as="select" name="availability" value={filters.availability} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="inStock">In Stock</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={applyFilters}>Apply Filters</Button>
        <Button variant="secondary" onClick={clearFilters} className="ml-2">Clear Filters</Button>
      </Form>
      <Row>
  {products.map((product, index) => (
    <Col sm={12} md={6} lg={4} key={index} className="mb-4">
      <Link to={`/product/${product.product_id}`} className="product-link">
        <Card>
          <Card.Img variant="top" src={product.product_image} />
          <Card.Body>
            <Card.Title>{product.productName}</Card.Title>
            <Card.Text>
              <strong>Category:</strong> {product.category}<br />
              <strong>Company:</strong> {product.company}<br />
              <strong>Price:</strong> ${product.price}<br />
              <strong>Rating:</strong> {product.rating} stars<br />
              <strong>Discount:</strong> {product.discount}%<br />
              <strong>Availability:</strong> {product.availability ? 'In Stock' : 'Out of Stock'}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  ))}
</Row>

    </Container>
  );
};

export default AllProductsPage;
