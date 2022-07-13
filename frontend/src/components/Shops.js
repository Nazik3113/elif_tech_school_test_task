import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector, useDispatch } from "react-redux";
import { index as shopsIndex } from "../requests/shops";

const Shops = () => {
    const { activeShops, activeShopId, shops } = useSelector((state) => state.shops);
    const { items } = useSelector((state) => state.backet);
    const dispatch = useDispatch();

    function changeActiveShop(shopId) {
        dispatch({type: "SHOPS/CHANGE_ACTIVE_SHOP_ID", data: shopId});
    }

    useEffect(() => {
        shopsIndex()
            .then(res => {
                if (items.length > 0) {
                    const backetShopId = items[0].shop_id;
                    dispatch({type: "SHOPS/PUT_SHOPS", data: {shops: res.data, activeShopId: backetShopId}});
                    dispatch({type: "SHOPS/HIDE_UNACTIVE_SHOPS", data: backetShopId});
                } else {
                    dispatch({type: "SHOPS/PUT_SHOPS", data: {shops: res.data, activeShopId: res.data[0].id}});
                    dispatch({type: "SHOPS/UNHIDE_SHOPS"});
                }
            });
    }, [dispatch, items]);

    useEffect(() => {
        if (items.length > 0) {
            const backetShopId = items[0].shop_id;
            dispatch({type: "SHOPS/HIDE_UNACTIVE_SHOPS", data: backetShopId});
        } else {
            dispatch({type: "SHOPS/UNHIDE_SHOPS"});
        }
    }, [dispatch, items, shops]);

    return (
        <Col xs={2}>
            <Container className="brmain shops-container d-flex" style={{flexDirection: 'column', height: '100%'}}>
                <Row className="mx-auto" style={{marginBottom: '15px'}}>
                    <Col>
                        <h5><b>Магазини:</b></h5>
                    </Col>
                </Row>
                {activeShops.length > 0 
                    ?   activeShops.map((shop) => {
                            return (
                                <Row className="mx-auto" style={{marginBottom: '15px'}} key={shop.id}>
                                    <Col>
                                        <Button 
                                            variant={activeShopId === shop.id 
                                                        ? "secondary" 
                                                        : "outline-secondary"} 
                                            size="lg" 
                                            style={{width: '150px'}}
                                            onClick={changeActiveShop.bind(this, shop.id)}
                                        >
                                            {shop.name}
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        })  
                    :   <Spinner animation="grow" role="status" className="mx-auto" style={{width: '5rem', height: '5rem'}} />
                }
            </Container>
        </Col>
    );
};

export default Shops;