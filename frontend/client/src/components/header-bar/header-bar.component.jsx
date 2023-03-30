import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

import SearchBox from '../search-box/search-box.component';

const AddProductButton = styled(Button)({
    color: 'white',
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#e3a82b',
    },
  });
  

const SearchAppBar = ({ onSearchChangeHandler }) => {
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 2}}>
      <AppBar position="static">
        <Toolbar>
          <SearchBox
            className='search-box'
            onSearchChangeHandler={onSearchChangeHandler} 
            placeholder='Search Products' 
            >
          </SearchBox>
          <AddProductButton variant="contained" sx={{backgroundColor:'#fbba1a', color:'black'}} startIcon={<AddIcon />}>
            Add Product
          </AddProductButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            IMB Project Catalog
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchAppBar;