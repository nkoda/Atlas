const SearchBox = ({ className, placeholder, onSearchChangeHandler }) => (
    <input 
        className={className}
        type='search' 
        placeholder={placeholder}
        onChange={onSearchChangeHandler}
    />
);

export default SearchBox;