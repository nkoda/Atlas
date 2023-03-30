import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Modal,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const BlackOverlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const FormCard = styled(Card)({
  width: '90%',
  maxWidth: 600,
});

const FormCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const FormTextField = styled(TextField)({
  width: '100%',
  marginBottom: 10,
});

const AddProductOverlay = ({ onAddProduct, handleCloseOverlay }) => {
  const [isOverlayVisible, setOpen] = useState(true);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleClose = () => {
    setOpen(false);
    handleCloseOverlay(isOverlayVisible);
  };

  const handleAddProduct = () => {
    onAddProduct({
      productName: productName,
      productDescription: productDescription,
    });
    handleClose();
  };

  return (
    <>
      <Modal open={isOverlayVisible} onClose={handleClose}>
        <BlackOverlay>
          <FormCard>
            <IconButton onClick={handleClose}>
              <CloseIcon/>
            </IconButton>
            <FormCardContent>
              <Typography variant="h5" component="div">
                Add Product
              </Typography>
              <Box sx={{ width: '100%', marginTop: 2 }}>
                <FormTextField
                  label="Product Name"
                  variant="outlined"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <FormTextField
                  label="Product Description"
                  variant="outlined"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  multiline
                  rows={4}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            </FormCardContent>
          </FormCard>
        </BlackOverlay>
      </Modal>
    </>
  );
};

export default AddProductOverlay;
