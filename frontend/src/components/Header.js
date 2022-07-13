import React, { useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const Header = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((store) => store.backet);

    useEffect(() => {
        const backet = localStorage.getItem('backet');

        if (backet) {
            dispatch({type: "BACKET/SET_BACKET", data: JSON.parse(backet)});
        }
    }, [dispatch]);

    return (
        <Row className="header-container">
            <Col className="d-flex brl">
                <Link to="/" className="link mx-auto" style={{display: "flex", alignItems: "center"}}>Магазин</Link>
            </Col>
            <Col className="d-flex brl">
                <Link to="/backet" className="link mx-auto" style={{display: "flex", alignItems: "center"}}>Корзина ({items.length})</Link>
            </Col>
            <Col className="d-flex">
                <Link to="/orders-history" className="link mx-auto" style={{display: "flex", alignItems: "center"}}>Історія замовлень</Link>
            </Col>
            <Col xs={8}></Col>
        </Row>
    );
};

export default Header;