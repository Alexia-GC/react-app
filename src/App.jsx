import "./App.css";
import { NavBar } from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Cart } from './components/Cart';
import Footer from './components/Footer';

function App() {
  return (
    <CartProvider>
      <BrowserRouter >
        <div className="App">
          <NavBar />
          <div className="container">
              <Switch >
                  <Route exact path='/'>
                      <ItemListContainer />
                  </Route>
                  <Route  path='/category/:categoryId'>
                      <ItemListContainer />
                  </Route>
                  <Route path="/item/:id">
                    <ItemDetailContainer/>
                  </Route>
                  <Route exact path='/cart'>
                    <Cart />
                  </Route>
                  <Route path='*'>
                    No se encontró la página
                  </Route>
                  </Switch> 
                </div>
        </div>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;