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

import { v4 as uuidv4 } from 'uuid';

import { getCurrentDate } from '../utils/current-date';

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

const handleEmptyFields = (prop, nullCase='') => {
  return prop !== 'undefined' ? prop : nullCase
}

const AddProductOverlay = ({
  onAddProduct,
  handleCloseOverlay,
  product = { developers: [], productId: uuidv4() },
}) => {
  const [isOverlayVisible, setOpen] = useState(true);
  const [productName, setProductName] = useState(handleEmptyFields(product.productName));
  const [productOwnerName, setProductOwnerName] = useState(handleEmptyFields(product.productOwnerName));
  const [scrumMasterName, setScrumMasterName] = useState(handleEmptyFields(product.scrumMasterName));
  const [dev0, setDev0] = useState(handleEmptyFields(product.developers[0], ''));
  const [dev1, setDev1] = useState(handleEmptyFields(product.developers[1], ''));
  const [dev2, setDev2] = useState(handleEmptyFields(product.developers[2], ''));
  const [dev3, setDev3] = useState(handleEmptyFields(product.developers[3], ''));
  const [dev4, setDev4] = useState(handleEmptyFields(product.developers[4], ''));
  const [startDate, setStartDate] = useState(handleEmptyFields(product.startDate, getCurrentDate()));
  const [methodology, setMethodology] = useState(handleEmptyFields(product.methodology));
  
  const handleClose = () => {
    setOpen(false);
    handleCloseOverlay(isOverlayVisible);
  };

  const handleAddProduct = () => {
    const developers = [dev0, dev1, dev2, dev3, dev4].filter(dev => dev !== undefined);
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

  const methodTypes = [
    {
      value: 'Agile',
    },
    {
      value: 'Waterfall',
    },
  ];

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
                  defaultValue="Agile"
                  value={methodology}
                  onChange={(e) => setMethodology(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {methodTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </TextField>
                <TextField
                  name="Start Date"
                  variant="filled"
                  label="Start Date"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  defaultValue={startDate}
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
