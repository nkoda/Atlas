import { IconButton, Paper, Divider, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const SearchBox = ({ className, placeholder, onSearchChangeHandler }) => (
    <Box sx={{ padding: 2 }}>
        <Paper 
        sx={{ paddingX: 2 }}
        className={className}
        component="search"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={placeholder}
            onChange={onSearchChangeHandler}
            inputProps={{ 'aria-label': 'Search IMB Project Catalog' }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
        </Paper>
    </Box>
);

export default SearchBox;