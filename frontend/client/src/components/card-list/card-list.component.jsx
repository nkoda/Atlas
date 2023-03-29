import { Component } from 'react';
import ProductCard from '../card/card.component';

class CardList extends Component {

    render() {
        const { products } = this.props;
        return (
            <div>
                {products.map((product) => {
                    const {
                        productId, 
                        productName, 
                        productOwnerName,
                        developers,
                        startDate,
                        methodology
                    } = product
                    return (
                    <div>
                        <ProductCard product={product} key={`${productId}-card`}/>
                    </div>)

                    }
                )}
            </div>
        );
    }
}

export default CardList;