import {Grid, Box} from '@mui/material';
import ProductCard from '../card/product-card.component';

const CardList = ({ products, onRemoveProduct, onUpdateProduct }) => (
    <Box sx={{ paddingX: 2 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.productId}>
            <ProductCard 
              product={product} 
              onRemoveProduct={onRemoveProduct} 
              onUpdateProduct={onUpdateProduct}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

export default CardList;