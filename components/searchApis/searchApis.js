import React, { useEffect, useState } from 'react';

import FilterHeader from './filterHeader';
import Results from './results';
import {
  filterTheme,
  filterAccess,
  computeSearchResults,
} from './filtersLogic';

const SearchApis = ({ allApis, allThemes }) => {
  const [apiList, setApiList] = useState(allApis);

  const [theme, setFilterTheme] = useState(null);
  const [access, setFilterAccess] = useState(false);
  const [searchTerms, setFilterSearch] = useState([]);

  const allThemesOptions = allThemes.map((el, index) => {
    return { value: index, label: el };
  });

  useEffect(() => {
    let res = allApis;
    if (searchTerms.length > 0) {
      res = allApis
        .map(computeSearchResults(cleanedSearchTerms))
        .filter(api => api.score !== 0);
    }

    const newApiList = res
      .filter(filterAccess(access))
      .filter(filterTheme(theme))
      .sort((a, b) => ((a.visits_2019 || 0) < b.visits_2019 ? 1 : -1));

    setApiList(newApiList);
    return () => {};
  }, [theme, access, searchTerms]);

  const setSearchTerm = str => {
    const cleanedSearchTerms = str.split(' ').filter(t => !!t);
    setFilterSearch(cleanedSearchTerms);
  };

  return (
    <>
      <FilterHeader
        allThemesOptions={allThemesOptions}
        setFilterTheme={idx => setFilterTheme(idx ? allThemes[idx] : null)}
        setFilterAccess={setFilterAccess}
        setFilterSearch={setSearchTerm}
      />
      <Results apiList={apiList} />
    </>
  );
};

export default SearchApis;
