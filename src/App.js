import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/nav-bar.js';
import ItemListContainer from './components/item-list-container.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <ItemListContainer />
    </div>
  );
}

export default App;
