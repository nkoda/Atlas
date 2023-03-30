import {Grid} from '@mui/material';
import ProductCard from '../card/product-card.component';

const CardList = ({ products }) => (
    <Grid container spacing={3}>
    {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.productId}>
        <ProductCard product={product} />
        </Grid>
    ))}
    </Grid>

);

export default CardList;