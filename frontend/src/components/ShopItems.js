import React, { useEffect } from "react";
import Col from 'react-bootstrap/Col';
import { show as shopsItemsShow } from "../requests/shopsItems";
import { useSelector, useDispatch } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ShopItems = () => {
    const { shopItems } = useSelector((store) => store.shopsItems);
    const { activeShopId } = useSelector((store) => store.shops);
    const { items } = useSelector((store) => store.backet);
    const dispatch = useDispatch();

    useEffect(() => {
        shopsItemsShow(activeShopId)
            .then(res => {
                dispatch({type: "SHOPS_ITEMS/PUT_SHOP_ITEMS", data: res.data});
            })
            .catch((error) => {
                dispatch({type: "ERROR/SHOW_ERROR", data: "Помилка API, спробуйте будь ласка ще раз за кілька хвилин."});
            });
    }, [dispatch, activeShopId]);

    function addItemToBucket(shopItem) {
        const otherShops = items.filter((backetItem) => {
            if (backetItem.shop_id !== activeShopId) {
                return true;
            } 
            return false;  
        });
        if (otherShops.length > 0) {
            return dispatch({type: "ERROR/SHOW_ERROR", data: "Неможливо зробити замовлення одночасно з декількох магазинів!"});
        }
        const itemDublicates = items.filter((backetItem) => {
            if (backetItem.id === shopItem.id) {
                return true;
            } 
            return false;  
        });
        if (itemDublicates.length > 0) {
            return dispatch({type: "ERROR/SHOW_ERROR", data: "Цей продукт уже знаходиться в корзині!"});
        }
        dispatch({type: "BACKET/ADD_ITEM_TO_BACKET", data: {...shopItem, amount: 1}});
        return dispatch({type: "NOTIFICATION/SHOW_NOTIFICATION", data: "Продукт успішно додано до корзини."});
    }

    return (
        <Col className="brmain d-flex shops-items-container" xs={10} style={{alignItems: 'stretch', justifyContent: 'center', flexFlow: 'wrap', overflowY: 'scroll', maxHeight: '90vh'}}>
            {shopItems.length > 0 
                ? shopItems.map((shopItem) => 
                    <Card style={{ width: '15rem', padding: '10px', margin: '10px'}} key={shopItem.id}>
                        <Card.Body className="d-flex" style={{flexDirection: 'column', justifyContent: 'center'}}>
                            <Card.Img variant="top" src={`/images/${shopItem.image}`} style={{width: 'auto', height: 'auto', maxWidth: '150px', margin: 'auto', maxHeight: '150px'}} />
                        </Card.Body>
                        <Card.Body className="d-flex" style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                            <Card.Title>{shopItem.name}</Card.Title>
                            <Card.Text><b>{shopItem.price}</b> ₴</Card.Text>
                            <Button 
                                variant="primary"
                                onClick={addItemToBucket.bind(this, shopItem)}
                            >
                                Додати в корзину
                            </Button>
                        </Card.Body>
                    </Card>
                )
                : <Spinner animation="grow" role="status" className="mx-auto" style={{width: '5rem', height: '5rem'}} />
            }
        </Col>
    );
};

export default ShopItems;