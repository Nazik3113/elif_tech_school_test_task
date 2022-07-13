import './App.css';
import { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Row from 'react-bootstrap/Row';
import Shops from './components/Shops';
import ShopItems from './components/ShopItems';
import Error from './components/Error';
import Notification from "./components/Notification";
import OrdersHistory from './components/OrdersHistory';
import Backet from './components/Backet';
import { Provider } from "react-redux";
import store from './store/index';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  useEffect(() => {
    const cookies = new Cookies();

    if (!cookies.get('sessionId')) {
      cookies.set('sessionId', uuidv4(), { path: '/' });
    }
  }, []);

  return (
    <Router>
      <Provider store={store}>
        <div className="app">
          <Header />
          <Row style={{alignItems: 'stretch', height: '90vh'}}>
            <Routes>
              <Route path="/" element={[
                <Shops key="shops" />, 
                <ShopItems key="shopsItems" />
              ]} />
              <Route path="/backet" element={<Backet />} />
              <Route path="/orders-history" element={<OrdersHistory />} />
            </Routes>
          </Row>
          <Error />
          <Notification />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
