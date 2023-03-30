import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import SearchBox from '../search-box/search-box.component';

const SearchAppBar = ({ onSearchChangeHandler }) => {
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 2}}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <SearchBox
            className='search-box'
            onSearchChangeHandler={onSearchChangeHandler} 
            placeholder='Search Products' 
            >
          </SearchBox>
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