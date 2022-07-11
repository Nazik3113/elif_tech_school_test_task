import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Shops = () => {
    return (
        <Container className="brmain shops-container d-flex" style={{flexDirection: 'column'}}>
            <Row className="mx-auto" style={{marginBottom: '15px'}}>
                <Col>
                    <h5><b>Магазини:</b></h5>
                </Col>
            </Row>
            <Row className="mx-auto" style={{marginBottom: '15px'}}>
                <Col>
                    <Button variant="outline-secondary" size="lg">Secondary</Button>
                </Col>
            </Row>    
            <Row className="mx-auto" style={{marginBottom: '15px'}}>
                <Col>
                    <Button variant="outline-secondary" size="lg">Secondary</Button>
                </Col>
            </Row>        
        </Container>
    );
};

export default Shops;