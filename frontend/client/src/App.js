import { Component } from 'react';

import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api')
      .then((response) => response.json())
      .then(items => this.setState(() =>{
        return { products: items }
      }))
  }

  render() {
    return (
      <div className="App">
        {
          this.state.products.map((product) => {
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
