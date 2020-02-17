import React from 'react';

import { SearchBar, Toggle, Dropdown } from '../../uiComponents';

export const FilterHeader = ({
  setFilterSearch,
  setFilterTheme,
  setFilterAccess,
}) => (
  <section id="search-params">
    <SearchBar
      onSearch={setFilterSearch}
      placeholder="Recherchez plein de trucs"
    />
    <Dropdown
      label="Filtrer par thème"
      onChange={setFilterTheme}
      selectOptions={[{ value: 1, label: 'première option' }]}
    />
    <Toggle
      label="N'afficher que les Apis nécessitant une habilitation"
      onChange={setFilterAccess}
    />
  </section>
);

export default FilterHeader;
