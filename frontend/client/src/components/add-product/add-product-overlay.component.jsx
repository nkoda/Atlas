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

// Importing UUID to generate unique IDs for products
import { v4 as uuidv4 } from 'uuid';

import { getCurrentDate } from '../utils/current-date';

// Defining styled components
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

// This code defines a React component named AddProductOverlay, 
//which provides a form for users to input details about a new project,
// and then adds that project to the parent component's state.
const AddProductOverlay = ({
  onAddProduct, // A function that gets called when a new product is added
  handleCloseOverlay, // A function that gets called when the overlay is closed
  product = {  // The initial product values to be displayed in the form fields
    productId: uuidv4(),
    productName: '',
    productOwnerName: '',
    scrumMasterName: '',
    developers: [],
    startDate: getCurrentDate(),
    methodology: 'agile',
  },
}) => {
  // Setting up the state hooks for different form fields
  const [isOverlayVisible, setOpen] = useState(true);
  const [productName, setProductName] = useState(product.productName);
  const [productOwnerName, setProductOwnerName] = useState(product.productOwnerName);
  const [scrumMasterName, setScrumMasterName] = useState(product.scrumMasterName);
  const [dev0, setDev0] = useState(product.developers[0]);
  const [dev1, setDev1] = useState(product.developers[1]);
  const [dev2, setDev2] = useState(product.developers[2]);
  const [dev3, setDev3] = useState(product.developers[3]);
  const [dev4, setDev4] = useState(product.developers[4]);
  const [startDate, setStartDate] = useState(product.startDate);
  const [methodology, setMethodology] = useState(product.methodology);
  
  // Function to close the overlay and call the handleCloseOverlay function
  const handleClose = () => {
    setOpen(false);
    handleCloseOverlay(isOverlayVisible);
  };

  // Function to add a new product by calling the onAddProduct function
  const handleAddProduct = () => {
    // Creating an array of developers and removing any undefined values
    const developers = [dev0, dev1, dev2, dev3, dev4].filter(dev => dev !== undefined);
    
    // Calling the onAddProduct function with the new product object
    onAddProduct({
      productId: product.productId,
      productName: productName,
      productOwnerName: productOwnerName,
      scrumMasterName: scrumMasterName,
      developers: developers,
      startDate: startDate,
      methodology: methodology,
    });
    handleClose();
  };

  // methodology types for the dropdown menu
  const methodTypes = [{value:'agile', label:'Agile'}, {value:'waterfall', label:'Waterfall'}];
  // render the overlay and add-project form card
  return (
    <>
      <Modal open={isOverlayVisible} onClose={handleClose}>
        <BlackOverlay>
          <FormCard sx={{ margin: 5, overflow: 'auto'}}>
            <IconButton onClick={handleClose}>
              <CloseIcon/>
            </IconButton>
            <FormCardContent>
              <Typography variant="h5" component="div">
                New Project
              </Typography>
              <Box sx={{ width: '95%', marginTop: 2 }}>
                <FormTextField
                  label="Product Name"
                  variant="filled"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <FormTextField
                  label="Product Owner's Name"
                  variant="filled"
                  value={productOwnerName}
                  onChange={(e) => setProductOwnerName(e.target.value)}
                />
                <FormTextField
                  label="Scrum Master"
                  variant="filled"
                  value={scrumMasterName}
                  onChange={(e) => setScrumMasterName(e.target.value)}
                />
                <FormTextField
                  label="Developer 1"
                  variant="filled"
                  value={dev0}
                  onChange={(e) => setDev0(e.target.value)}
                />
                <FormTextField
                  label="Developer 2"
                  variant="filled"
                  value={dev1}
                  onChange={(e) => setDev1(e.target.value)}
                />
                <FormTextField
                  label="Developer 3"
                  variant="filled"
                  value={dev2}
                  onChange={(e) => setDev2(e.target.value)}
                />
                <FormTextField
                  label="Developer 4"
                  variant="filled"
                  value={dev3}
                  onChange={(e) => setDev3(e.target.value)}
                />
                <FormTextField
                  label="Developer 5"
                  variant="filled"
                  value={dev4}
                  onChange={(e) => setDev4(e.target.value)}
                />
                <TextField
                  select
                  variant="filled"
                  label="Methodology"
                  defaultValue={methodology}
                  onChange={(e) => setMethodology(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {methodTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <TextField
                  name="Start Date"
                  variant="filled"
                  label="Start Date"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  defaultValue={getCurrentDate()}
                  value={startDate}
                  onChange={(e) => {setStartDate(e.target.value)}}
                />
              <Button
                variant="contained"
                color="primary"
                sx={{ width: '40%', marginLeft: 5, margin: 1 }}
                onClick={handleAddProduct}
              >
                submit Project
              </Button>
              </Box>
            </FormCardContent>
          </FormCard>
        </BlackOverlay>
      </Modal>
    </>
  );
};

export default AddProductOverlay;
