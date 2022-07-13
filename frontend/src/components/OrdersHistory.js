import React, { useEffect } from "react";
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from "react-redux";
import { showBySessionId } from "../requests/orders-history";
import Cookies from 'universal-cookie';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const OrdersHistory = () => {
    const { ordersHistoryItems } = useSelector((store) => store.ordersHistory);
    const dispatch = useDispatch();

    useEffect(() => {
        const cookies = new Cookies();

        showBySessionId(cookies.get('sessionId'))
            .then((res) => {
                dispatch({type: "ORDERS_HISTORY/PUT_ORDERS_HISTORY", data: res.data});
            });
    }, [dispatch]);

    return (
        <Form style={{display: "flex", flexDirection: "column"}}>
            <Row style={{display: "flex", justifyContent: "space-around", height: "100%"}}>
                <Col className="brmain orders-history-container" xs={12} style={{overflowY: 'scroll', maxHeight: '90vh', textAlign: "center"}}>
                    {ordersHistoryItems.length > 0 
                        ?   ordersHistoryItems.map((ordersHistoryItem) => {
                            return (
                                <Card style={{marginBottom: "20px", width: "100%", height: "250px"}} key={ordersHistoryItem.id}>
                                    <Card.Body style={{display: "flex", justifyContent: "space-between", flexDirection: "initial"}}>
                                        <Col xs={8} className="cards" style={{display: "flex", overflowX: "scroll"}}>
                                            {ordersHistoryItem.items.map((orderHistoryItemsItem) => {
                                                console.log(orderHistoryItemsItem);
                                                return (
                                                    <Card key={orderHistoryItemsItem.id} style={{display: "flex", justifyContent: "space-between", flexDirection: "initial", height: "100%", maxWidth: "800px", minWidth: "700px", marginRight: "20px"}}>
                                                        <Col xs={6} className="cards" style={{display: "flex", padding: "10px"}}>
                                                            <Card.Img src={`/images/${orderHistoryItemsItem.image}`} style={{width: "auto", height: "auto", maxWidth: "150px", margin: "auto", maxHeight: "150px", textAlign: "center"}} />
                                                        </Col>
                                                        <Col xs={6} className="cards" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px"}}>
                                                            <Card.Text style={{marginBottom: 0}}>{orderHistoryItemsItem.store_item_name}</Card.Text>
                                                            <Card.Text style={{marginBottom: 0}}>Ціна: <b>{orderHistoryItemsItem.price}</b> ₴</Card.Text>
                                                            <Card.Text style={{marginBottom: 0}}>Магазин: <b>{orderHistoryItemsItem.store_name}</b></Card.Text>
                                                            <Card.Text style={{marginBottom: 0}}>Кількість: <b>{orderHistoryItemsItem.amount}</b></Card.Text>
                                                        </Col>
                                                    </Card>
                                                );
                                            })}
                                        </Col>
                                        <Col xs={4} className="cards" style={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
                                            <Card.Text style={{marginBottom: 0}}>
                                                Ім'я: <b>{ordersHistoryItem.name}</b>
                                            </Card.Text>
                                            <Card.Text style={{marginBottom: 0}}>
                                                Емейл: <b>{ordersHistoryItem.email}</b>
                                            </Card.Text>
                                            <Card.Text style={{marginBottom: 0}}>
                                                Телефон: <b>{ordersHistoryItem.phone}</b>
                                            </Card.Text>
                                            <Card.Text style={{marginBottom: 0}}>
                                                Адреса: <b>{ordersHistoryItem.address}</b>
                                            </Card.Text>
                                            <Card.Text style={{marginBottom: 0}}>
                                                Ід замовлення: <b>{ordersHistoryItem.id}</b>
                                            </Card.Text>
                                            <Card.Text style={{marginBottom: 0}}>
                                                Ціна: <b>{ordersHistoryItem.price}</b> ₴
                                            </Card.Text>
                                        </Col>
                                    </Card.Body>
                                </Card>
                            );
                        })
                        :   <h3>Немає замовлень(</h3>
                    }
                </Col>
            </Row>
        </Form>
    );
};

export default OrdersHistory;