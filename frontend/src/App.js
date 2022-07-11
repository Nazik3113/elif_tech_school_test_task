import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Shops from './components/Shops';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Row>
            <Col className="d-flex h-100" xs={3} style={{minHeight: 'calc(98vh - 78px)'}}>
              <Shops/>
            </Col>
            <Col className="d-flex h-100 brmain" xs={9} style={{minHeight: 'calc(98vh - 78px)'}}>
              Корзина
            </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
