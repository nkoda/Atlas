import { 
    IconButton, 
    Paper, 
    Divider, 
    Box,
    InputBase,
    ToggleButtonGroup,
    ToggleButton 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';


// react component that returns a search box with search filter parameters and a 'results' count
const SearchBox = ({ 
    className, 
    placeholder, 
    onSearchChangeHandler,
    onSearchParams,
    displayNumResults }) => {
        const [searchParams, setSearchParams] = useState(() => ['scrumMaster', 'developer']);

        // function that handles the toggled search parameters
        const handleSearchParams = (event, newSearchParams) => {
            setSearchParams(newSearchParams);
            onSearchParams(newSearchParams);
        };

    return(
        <Box sx={{ padding: 2 }}>
        <Paper 
        className={className}
        component="search"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800 }}
        >
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={placeholder}
            onChange={onSearchChangeHandler}
            inputProps={{ 'aria-label': 'Search IMB Project Catalog' }}
            />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            Results: {displayNumResults}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <ToggleButtonGroup 
            size="small" 
            value={searchParams}
            onChange={handleSearchParams}>
            <ToggleButton value='scrumMaster'>
                By Scrum Master
            </ToggleButton>
            <ToggleButton value='developer'>
                By Developer
            </ToggleButton>
        </ToggleButtonGroup>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
        </Paper>
    </Box>
    )    
};

export default SearchBox;