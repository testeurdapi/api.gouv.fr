import React from 'react';

import { SearchBar, Toggle, Dropdown } from '../../uiComponents';
import colors from '../../styles/colors';

export const FilterHeader = ({
  setFilterSearch,
  setFilterTheme,
  setFilterAccess,
}) => (
  <section id="search-params">
    <div className="ui container">
      <Dropdown
        label="Filtrer par thème"
        onChange={setFilterTheme}
        selectOptions={[{ value: 1, label: 'première option' }]}
      />
      <div className="habilitation-wrapper">
        <label>Habilitation</label>
        <div>
          <Toggle
            label="Uniquement les APIs sous habilitation"
            onChange={setFilterAccess}
          />
        </div>
      </div>
      <SearchBar
        onSearch={setFilterSearch}
        placeholder="Recherchez un service, un ministère"
        label="Rechercher une API"
        width={450}
      />
    </div>

    <style jsx>{`
      section#search-params {
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
      }
      section > div {
        display: flex;
        justify-content: space-between;
      }

      .habilitation-wrapper > div {
        height: 38px;
        display: flex;
        align-items: center;
      }

      .habilitation-wrapper label {
        line-height: 18px;
        font-weight: 600;
        color: ${colors.darkestGrey};
        font-size: 0.9rem;
      }
    `}</style>
  </section>
);

export default FilterHeader;
