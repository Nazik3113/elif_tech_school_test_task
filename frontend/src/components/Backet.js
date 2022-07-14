import React, { useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from "react-redux";
import Card from 'react-bootstrap/Card';
import { create as createOrderRequest } from "../requests/orders";
import Cookies from 'universal-cookie';

const Backet = () => {
    const dispatch = useDispatch();
    const { name, email, phone, address, sum, items } = useSelector((store) => store.backet);

    useEffect(() => {
        const totalSum = items.reduce((totalSum, backetItem) => {
            return (backetItem.price * backetItem.amount) + totalSum
        }, 0);

        dispatch({type: "BACKET/SET_SUM", data: totalSum});
    }, [dispatch, items]);

    function createOrder(event) {
        event.preventDefault();
        const cookies = new Cookies();
        const validation = validateForm();

        if (validation === true) {
            createOrderRequest(cookies.get('sessionId'), name, email, phone, address, sum, items)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch({type: "NOTIFICATION/SHOW_NOTIFICATION", data: "Замовлення успішно створене, очікуйте на доставку."});
                        dispatch({type: "BACKET/DROP_BACKET"});
                    } else {
                        dispatch({type: "NOTIFICATION/SHOW_NOTIFICATION", data: "Не вдалося створити замовлення, спробуйте ще раз за кілька хвилин."});
                    }
                });
        }
    }

    function validateForm() {
        const nameRegex = /[0-9]/;
        if (name.length <= 1 || nameRegex.exec(name)) {
            dispatch({type: "ERROR/SHOW_ERROR", data: "Ім'я повинне складатися з більш ніж одного симвлу та не вміщувати в собі цифр."});
            return false;
        }

        if (email.length === 0 && phone.length === 0) {
            dispatch({type: "ERROR/SHOW_ERROR", data: "Одне з полів 'Емейл' або 'Телефон' має бути заповнене для зворотньго зв'язку."});
            return false;
        }

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email.length > 0 && !email.toLowerCase().match(emailRegex)) {
            dispatch({type: "ERROR/SHOW_ERROR", data: "Емейл не валідний."});
            return false;
        }

        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

        if (phone.length > 0 && !phone.match(phoneRegex)) {
            dispatch({type: "ERROR/SHOW_ERROR", data: "Телефон не валідний."});
            return false;
        }

        if (address.length === 0) {
            dispatch({type: "ERROR/SHOW_ERROR", data: "Поле 'Адреса' не заповнене."});
            return false;
        }

        return true;
    }

    function removeItem(id) {
        dispatch({type: "BACKET/REMOVE_ITEM_FROM_BACKET", data: id});
        dispatch({type: "NOTIFICATION/SHOW_NOTIFICATION", data: "Продукт успішно видалено з корзини."});
    }

    function updateName(name) {
        dispatch({type: "BACKET/SET_NAME", data: name});
    }

    function updateEmail(email) {
        dispatch({type: "BACKET/SET_EMAIL", data: email});
    }

    function updatePhone(phone) {
        dispatch({type: "BACKET/SET_PHONE", data: phone});
    }

    function updateAddress(address) {
        dispatch({type: "BACKET/SET_ADDRESS", data: address});
    }

    function changeAmount(amount, backetItemId) {
        if (amount >= 1) {
            dispatch({type: "BACKET/SET_AMOUNT", data: {amount, itemId: backetItemId}});
        }
    }

    return (
        <Form style={{display: "flex", flexDirection: "column"}}>
            <Row style={{display: "flex", justifyContent: "space-around", marginBottom: "20px", height: "90%"}}>
                <Col xs={5} className="backet-form-container brmain" style={{width: "49%"}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control type="name" placeholder="Вкажіть ім'я" value={name} onChange={event => updateName(event.target.value)} />
                        <Form.Text className="text-muted">
                            * обов'язкове поле
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Емейл</Form.Label>
                        <Form.Control type="email" placeholder="Вкажіть емейл" value={email} onChange={event => updateEmail(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control type="phone" placeholder="Вкажіть телефон" value={phone} onChange={event => updatePhone(event.target.value)} />
                        <Form.Text className="text-muted">
                            Вказуйте телефон у форматі 380000000000
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Адреса</Form.Label>
                        <Form.Control type="phone" placeholder="Вкажіть адресу" value={address} onChange={event => updateAddress(event.target.value)} />
                        <Form.Text className="text-muted">
                            * обов'язкове поле
                        </Form.Text>
                    </Form.Group>
                    
                </Col>
                <Col xs={5} className="backet-items-container brmain" style={{width: "49%", textAlign: "center", overflowY: 'scroll', maxHeight: "82vh"}}>
                    {items.length > 0 
                        ? items.map((backetItem) => {
                            return (
                                <Card key={backetItem.id} style={{marginBottom: "20px"}}>
                                    <Card.Body style={{display: "flex"}}>
                                        <Col xs={7} style={{textAlign: "center"}}>
                                            <Card.Img variant="top" src={`/images/${backetItem.image}`} style={{width: "auto", height: "auto", maxWidth: "150px", margin: "auto", maxHeight: "150px", textAlign: "center"}} />
                                        </Col>
                                        <Col xs={4}>
                                            <Card.Title>{backetItem.name}</Card.Title>
                                            <Card.Text>
                                                Ціна: <b>{backetItem.price}</b> ₴
                                            </Card.Text>
                                            <Row style={{display: "flex"}}>
                                                <Col xs={12} style={{display: "flex", justifyContent: "center"}}>
                                                    <div className="minus-button-container" onClick={changeAmount.bind(this, backetItem.amount - 1, backetItem.id)}>
                                                        <svg fill={backetItem.amount === 1 ? "#a6a5a5" : "#0d6efd"} focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"></path></svg>
                                                    </div>
                                                    <Form.Control placeholder="Кількість" type="number" min="1" disabled max="100" value={backetItem.amount} style={{width: "50px"}} />
                                                    <div className="plus-button-container" onClick={changeAmount.bind(this, backetItem.amount + 1, backetItem.id)}>
                                                        <svg fill="#0d6efd" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={1}>
                                            <div className="backet-delete-icon-cntainer" onClick={removeItem.bind(this, backetItem.id)}>
                                                <svg fill="#FE4A49" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                            </div>
                                        </Col>
                                    </Card.Body>
                                </Card>
                            ); 
                        })
                        : <h3>Корзина пуста(</h3>
                    }
                </Col>
            </Row>
            <Row style={{display: "flex"}}>
                <Col xs={6}></Col>
                <Col xs={6} style={{display: "flex", justifyContent: "space-between"}}>
                    <h4>
                        Загальна сума: <b>{sum}</b> ₴
                    </h4>
                    <Button variant="primary" type="submit" onClick={event => createOrder(event)}>
                        Зробити замовлення
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Backet;