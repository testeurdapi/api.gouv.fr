import React, { useRef } from 'react';
import { debounce } from 'lodash';

const SearchBar = ({ onSearch, placeholder, debounceRate = 100 }) => {
  const searchInput = useRef(null);
  const onChange = debounce(() => {
    if (!searchInput || !searchInput.current) {
      return;
    }
    onSearch(searchInput.current.value);
  }, debounceRate);

  return (
    <>
      <input
        placeholder={placeholder}
        onChange={onChange}
        type="text"
        ref={searchInput}
      />
      <button onClick={onChange}>🔍</button>
    </>
  );
};

export default SearchBar;
