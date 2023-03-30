import ProductCard from '../card/product-card.component';

const CardList = ({ products }) => (
    <div>
        {products.map((product) => {
            const { productId } = product
            return <ProductCard product={product} key={`${productId}-card`}/>;
        })}
    </div>
);

export default CardList;