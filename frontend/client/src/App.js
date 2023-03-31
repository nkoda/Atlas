import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchAppBar from './components/header-bar/header-bar.component';
import ModifyProductOverlay from './components/add-product/modify-product-overlay.component';

import { getProducts, pushNewProduct, deleteProduct, pushUpdatedProduct } from './api/api';

import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState(''); // search field input value
  const [fetchData, setFetchData] = useState(true);// triggers fetching of data from the API
  const [products, setProducts] = useState([]); //products fetched from the API
  const [filteredProducts, setFilteredProducts] = useState(products); //filtered products based on search query
  const [isAddProductOverlayVisible, setAddProductOverlayVisible] = useState(false); //controls visibility of add product overlay
  const [isUpdateProductOverlayVisible, setUpdateProductOverlayVisible] = useState(false); //controls visibility of add product overlay
  const [createdProduct, setCreateProduct] = useState(null); //new product created using the add product overlay
  const [hasMounted, setHasMounted] = useState(false); //checks if the component has mounted
  const [removeProduct, setRemoveProduct] = useState(null); //
  const [updateProduct, setUpdateProduct] = useState(null);
  const [preUpdateProductData, setPreUpdateProductData] = useState(null);

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

  // useEffect hook to remove product from the API based on productID
  useEffect(() => {
    if (hasMounted && removeProduct !== null) {
      deleteProduct(removeProduct)
        .then(() => {
          setRemoveProduct(null);
          setFetchData(true);
        }) // trigger refetching of data from the API after adding new product
    }
  }, [hasMounted, removeProduct]);

  // useEffect hook to update product from the API based on productID
  useEffect(() => {
    if (hasMounted && updateProduct !== null) {
      console.log(updateProduct.productId);
      pushUpdatedProduct(updateProduct.productId, updateProduct)
        .then(() => {
          setUpdateProduct(null);
          setFetchData(true);
        }) // trigger refetching of data from the API after adding new product
    }
  }, [hasMounted, updateProduct]);

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
    setAddProductOverlayVisible(true);
  };
  
  // function to handle the logic between transferring data and rendering the overlay menu
  const handleUpdateProductClick = (product) => {
    setPreUpdateProductData(product);
    setUpdateProductOverlayVisible(true);
  }

  // function to hide the modifying product overlay
  const handleCloseOverlay = () => {
    setAddProductOverlayVisible(false);
    setUpdateProductOverlayVisible(false);
  };
  
  // function to handle change in search field value
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString)
  };

  // function to handle to hook onto id of the product wanting to be deleted
  const handleDelete = (productId) => {
    setRemoveProduct(productId);
  }

  // render the SearchAppBar component, AddProductOverlay component, and CardList component
  return (
    <div className="App">
      <SearchAppBar 
        onSearchChangeHandler={onSearchChange} 
        onAddProductClick={handleAddProductClick}
      />
      {isAddProductOverlayVisible && 
        <ModifyProductOverlay 
          headerTitle="Add Product"
          onModifyProduct={setCreateProduct}
          handleCloseOverlay={handleCloseOverlay} 
        />}
      <CardList 
        products={filteredProducts} 
        onRemoveProduct={handleDelete}
        onUpdateProduct={handleUpdateProductClick}/>
      {isUpdateProductOverlayVisible && 
        <ModifyProductOverlay 
          headerTitle="Edit Product"
          onModifyProduct={setUpdateProduct}
          handleCloseOverlay={handleCloseOverlay} 
          product={preUpdateProductData}
        />}
    </div>
  );
}
export default App;
