import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchAppBar from './components/header-bar/header-bar.component';
import AddProductOverlay from './components/add-product/add-product-overlay.component';

import { getProducts, pushNewProduct, deleteProduct } from './api/api';

import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState(''); // search field input value
  const [fetchData, setFetchData] = useState(true);// triggers fetching of data from the API
  const [products, setProducts] = useState([]); //products fetched from the API
  const [filteredProducts, setFilteredProducts] = useState(products); //filtered products based on search query
  const [isAddProductOverlayVisible, setIsAddProductOverlayVisible] = useState(false); //controls visibility of add product overlay
  const [createdProduct, setCreateProduct] = useState(null); //new product created using the add product overlay
  const [hasMounted, setHasMounted] = useState(false); //checks if the component has mounted
  const [removeProduct, setRemoveProduct] = useState(null);

  // useEffect hook to check if the component has mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // useEffect hook to fetch products from the API
  useEffect(() => {
    if (fetchData) {
      getProducts()
        .then(items => setProducts(items))
        .then(setFetchData(false)); // set fetchData to false after fetching data
    }
  }, [fetchData]);

  useEffect(() => {
    if (hasMounted && removeProduct !== null) {
      deleteProduct(removeProduct)
        .then(() => {
          setRemoveProduct(null);
          setFetchData(true);
        }) // trigger refetching of data from the API after adding new product
    }
  }, [hasMounted, removeProduct]);

  // useEffect hook to create new product using the pushNewProduct API method
  useEffect(() => {
    if (hasMounted && createdProduct !== null) {
      pushNewProduct(createdProduct)
        .then(() => {
          setCreateProduct(null);
          setFetchData(true);
        }) // trigger refetching of data from the API after adding new product
    }
  }, [hasMounted, createdProduct]);

  // useEffect hook to filter products based on search query
  useEffect(() => {
    if (!Array.isArray(products)) {
      return;
    }
    const newFilteredProducts = products.filter((item) => {
      if (item && item.productName) {
        return item.productName.toLowerCase().includes(searchField);
      } else {
        return false;
      }});
    setFilteredProducts(newFilteredProducts);
  }, [products, searchField]);

  // function to show the add product overlay when the add product button is clicked
  const handleAddProductClick = () => {
    setIsAddProductOverlayVisible(true);
  };

  // function to hide the add product overlay
  const handleCloseOverlay = () => {
    setIsAddProductOverlayVisible(false);
  };

  // function to handle change in search field value
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString)
  };

  const handleDelete = (event) => {
    setRemoveProduct(event);
  }

  // render the SearchAppBar component, AddProductOverlay component, and CardList component
  return (
    <div className="App">
      <SearchAppBar 
        onSearchChangeHandler={onSearchChange} 
        onAddProductClick={handleAddProductClick}
      />
      {isAddProductOverlayVisible && 
        <AddProductOverlay 
          onAddProduct={setCreateProduct}
          handleCloseOverlay={handleCloseOverlay} 
          prop={{}}/>}
      <CardList products={filteredProducts} onRemoveProduct={handleDelete}/>
    </div>
  );
}
export default App;
