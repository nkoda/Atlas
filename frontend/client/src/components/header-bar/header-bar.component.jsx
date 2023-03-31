import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import SearchBox from '../search-box/search-box.component';

//defining custom style for add product button
const AddProductButton = styled(Button)({
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#e3a82b',
    },
  });

  // React component for app header
const HeaderAppBar = ({ onSearchChangeHandler, onAddProductClick, onSearchParams, numberOfDisplayedCards }) => {
  const [isAddProductButtonClicked, setIsAddProductButtonClicked] = useState(false); // a state to define product button clicks

  //A function to handle the click add product button event
  const handleAddButtonClick = () => {
    setIsAddProductButtonClicked(!isAddProductButtonClicked);
    onAddProductClick(isAddProductButtonClicked);
  }
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 2}}>
      <AppBar position="static">
        <Toolbar>
          <SearchBox
            className='search-box'
            onSearchChangeHandler={onSearchChangeHandler}
            onSearchParams={onSearchParams} 
            placeholder='Search Products' 
            displayNumResults={numberOfDisplayedCards}
            >
          </SearchBox>
          <AddProductButton 
            onClick={handleAddButtonClick} 
            variant="contained" 
            sx={{backgroundColor:'#fbba1a', color:'black'}} 
            startIcon={<AddIcon />}
          >
            Add Product
          </AddProductButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Project Catalog
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderAppBar;