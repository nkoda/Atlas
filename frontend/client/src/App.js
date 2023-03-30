import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import SearchAppBar from './components/header-bar/header-bar.component';

import { getProducts } from './api/api';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    getProducts()
      .then(items => setProducts(items));
  }, []);

  useEffect(() => {
    const newFilteredProducts = products.filter((item) => {
      if (item && item.productName) {
        return item.productName.toLowerCase().includes(searchField);
      } else {
        return false;
      }});
    setFilteredProducts(newFilteredProducts);
  }, [products, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString)
  };

  return (
    <div className="App">
      <SearchAppBar onSearchChangeHandler={onSearchChange}></SearchAppBar>
      <CardList products={filteredProducts}/>
    </div>
  );
}
export default App;
