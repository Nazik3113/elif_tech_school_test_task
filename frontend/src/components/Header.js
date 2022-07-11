import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Header = () => {
    return (
        <Container>
            <Row className="header-container">
                <Col className="d-flex brl">
                    <Button variant="link mx-auto">Магазин</Button>
                </Col>
                <Col className="d-flex brl">
                    <Button variant="link mx-auto">Корзина</Button>
                </Col>
                <Col className="d-flex">
                    <Button variant="link mx-auto">Історія замовлень</Button>
                </Col>
                <Col xs={6}></Col>
            </Row>
        </Container>
    );
};

export default Header;