import  { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import "./categorie.css"

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <Row className="horizontal-scroll overflow-auto flex-nowrap my-2" style={{ whiteSpace: 'nowrap' }}>
        {categories.map((category, index) => (
          <Col key={index} className="d-inline-block ">
            <div className="p-1 border text-center rounded">
              {category.name}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoriesList;
