import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchAppBar from './components/header-bar/header-bar.component';
import ModifyProductOverlay from './components/modify-product/modify-product-overlay.component';

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
  const [removeProduct, setRemoveProduct] = useState(null); //triggers delete request for a specific product ID 
  const [updateProduct, setUpdateProduct] = useState(null); //triggers update request for a specific product ID
  const [preUpdateProductData, setPreUpdateProductData] = useState(null); //product data for product wanting to be edited
  const [searchParams, setSearchParams] = useState(['scrumMaster','developer']); // searchbar parameters to specify what to search by 

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
      // a helper function to useEffect for search queries.
      // this helper processes the names in each project
      const extractNames = (element, attribute) => {
        const item = Array.isArray(element[attribute]) ? element[attribute].toString() : element[attribute];
        if (element && item) {
          return item.toLowerCase().includes(searchField);
        } else {
          return [];
        };
      }

      //filtering items based on search searchParams and the query
      if (searchParams.includes('scrumMaster') && searchParams.includes('developer')) {
        return extractNames(item, 'scrumMasterName') + extractNames(item, 'developers');
      } else if (searchParams.includes('developer')) {
        return extractNames(item, 'developers');
      } else if (searchParams.includes('scrumMaster')) {
        return extractNames(item, 'scrumMasterName');
      } else {
        return extractNames(item, 'productName');
      }
    });
    setFilteredProducts(newFilteredProducts);
  }, [products, searchField, searchParams]);

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
  const handleSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString)
  };

  // function to handle what type of search parameters are being used
  const handleSearchParams = (searchParams) => {
    setSearchParams(searchParams);
  }

  // function to handle to hook onto id of the product wanting to be deleted
  const handleDelete = (productId) => {
    setRemoveProduct(productId);
  }

  // function to handle to hook onto new product data to post on server
  const handleCreatePoduct = (product) => {
    setCreateProduct(product);
  }
  // function to handle to hook onto updated product data to post on server
  const handleUpdate = (product) => {
    setUpdateProduct(product);
  }

  // render the SearchAppBar component, AddProductOverlay component, and CardList component
  return (
    <div className="App">
      <SearchAppBar 
        onSearchChangeHandler={handleSearchChange} 
        onAddProductClick={handleAddProductClick}
        onSearchParams={handleSearchParams}
      />
      {isAddProductOverlayVisible && 
        <ModifyProductOverlay 
          headerTitle="Add Product"
          onModifyProduct={handleCreatePoduct}
          onCloseOverlay={handleCloseOverlay} 
        />}
      <CardList 
        products={filteredProducts} 
        onRemoveProduct={handleDelete}
        onUpdateProduct={handleUpdateProductClick}/>
      {isUpdateProductOverlayVisible && 
        <ModifyProductOverlay 
          headerTitle="Edit Product"
          onModifyProduct={handleUpdate}
          handleCloseOverlay={handleCloseOverlay} 
          product={preUpdateProductData}
        />}
    </div>
  );
}
export default App;
