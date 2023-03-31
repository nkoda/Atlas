import {useState, useEffect} from 'react';
import { 
  Box, Button, Card, CardActions, CardContent, Paper, Typography 
} from '@mui/material';

import LabelValueTypography from './label-value-typography.component';
import MethodologyBadge from './methodology-badge.component';

import InfoCardDelete from './info-card-warning-delete-product.component';

const ProductCard = ({ product, onRemoveProduct, onUpdateProduct }) => {
  const [isClickedRemoveButton, setClickRemoveButton] = useState(false); //state of the remove button
  const [isClickedEditButton, setClickEditButton] = useState(false); //state of the edit button
  const [hasMounted, setHasMounted] = useState(false); //checks if the component has mounted
    const {
        productId,
        productName,
        productOwnerName,
        scrumMasterName,
        developers,
        startDate,
        methodology,
    } = product;

    //a function to handle missing data entries in the ui 
    const handleDisplayProp = (prop) => {
      return prop ? prop : 'None';
    }
    
    // useEffect hook to check if the component has mounted
    useEffect(() => {
      setHasMounted(true);
    }, []);
    
    //useEffect hook to update state when edit button is clicked
    useEffect(() => {
      if (hasMounted && isClickedEditButton !== false) {
        onUpdateProduct(product);
        setClickEditButton(false);
      }
    },[hasMounted, isClickedEditButton]);
    
    //a dynamic component that creates <p> elements based on the number of developers
    const developersList = developers.map((developer) => {
        if (developer) {
          return (
          <p
            key={`${productId}${developer}`}
            style={{ margin: '4px 0', paddingLeft: '10px' }}
          >
            • {developer}
          </p>
        );
        }
        return (<div></div>);
      });

    return (
        <Paper>
            <Card sx={{ minWidth: 275 }}>
            <CardContent>
            <Typography variant="h5" align="left" gutterBottom>
              <Box display="inline-block" mr={1}>
                  <b>{productName}</b>
              </Box>
              <MethodologyBadge methodology={methodology}></MethodologyBadge>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1.5 }} align="left" color="text.secondary">
                <b>Project ID: </b> {productId}
            </Typography>
            <LabelValueTypography label="Owner" value={handleDisplayProp(productOwnerName)} />
            <LabelValueTypography label="Scrum Master" value={handleDisplayProp(scrumMasterName)} />
            <LabelValueTypography label="Developers" value={handleDisplayProp(developersList)} />
            <LabelValueTypography label="Start Date" value={handleDisplayProp(startDate)} />
            </CardContent>
            <CardActions>
            <Button size="small" onClick={() => {setClickEditButton(true)}}>Edit</Button>
            <Button size="small" onClick={() => {setClickRemoveButton(true)}}>Remove</Button>
            {isClickedRemoveButton && 
              <InfoCardDelete 
                onDeleteProduct={(bool) => { 
                  if (bool) {
                    return onRemoveProduct(productId)
                  } else {
                    setClickRemoveButton(false);
                  }
                  }} 
              /> 
            }
            </CardActions>
            </Card>
        </Paper>
    );
};

export default ProductCard;