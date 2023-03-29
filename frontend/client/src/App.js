import { Component } from 'react';

import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      searchField: '',
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api')
      .then((response) => response.json())
      .then(items => this.setState(() =>{
        return { products: items }
      }))
  }
  
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  }
  
  render() {

    const { products, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredProducts = products.filter((item) => {
      if (item && item.productName) {
        return item.productName.toLowerCase().includes(searchField);
      } else {
        return false;
      }
    })

    return (
      <div className="App">
        <input 
          className='search-box' 
          type='search' 
          placeholder='search products' 
          onChange={onSearchChange}
        />
        {
          filteredProducts.map((product) => {
            return  (
            <div key={product.productId}>
              <h1>{product.productName}</h1>
            </div>
            );
          })  
        }
      </div>
    );
  }
}

export default App;
