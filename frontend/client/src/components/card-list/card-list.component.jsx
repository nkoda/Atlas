import { Component } from 'react';
import ProductCard from '../card/product-card.component';

class CardList extends Component {

    render() {
        const { products } = this.props;
        return (
            <div>
                {products.map((product) => {
                    const { productId } = product
                    return (
                    <div>
                        <ProductCard product={product} key={`${productId}-card`}/>
                    </div>)
                })}
            </div>
        );
    }
}

export default CardList;