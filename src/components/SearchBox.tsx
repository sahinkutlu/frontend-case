import React from 'react';
import searchIcon from '../assets/search.svg';

const SearchBox = ({
    onChange,
}: {
    onChange: (value: string) => void;
}) => {
    return (
        <div className="search-container">
            <input placeholder="kategori ara..." type="text" onChange={(event) => onChange(event.target.value)} />
            <img src={searchIcon} alt="search-icon" />
        </div>
    );
}

export default SearchBox;