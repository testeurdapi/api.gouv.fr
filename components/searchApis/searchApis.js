import React, { useEffect, useState } from 'react';
import lunr from 'lunr';

import FilterHeader from './filterHeader';
import Results from './results';
import {
  filterTheme,
  filterAccess,
  computeSearchResults,
} from './filtersLogic';
import { normaliseStr } from '../../utils';

const useLunr = false;

const SearchApis = ({ allApis }) => {
  const [apiList, setApiList] = useState(allApis);

  const [theme, setFilterTheme] = useState(null);
  const [access, setFilterAccess] = useState(false);
  const [searchTerms, setFilterSearch] = useState([]);

  const idx = lunr(function() {
    this.ref('id');
    this.field('title');
    this.field('owner');
    this.field('description');

    allApis.forEach((api, index) => {
      this.add({
        title: api.title,
        owner: api.owner,
        description: api.description,
        id: index,
      });
    });
  });

  useEffect(() => {
    let res = allApis;
    if (searchTerms.length > 0) {
      if (useLunr) {
        res = idx
          .search('*' + searchTerms[0] + '*')
          .map(resApi => allApis[parseInt(resApi.ref, 0)]);
      } else {
        res = allApis
          .map(computeSearchResults(searchTerms))
          .filter(api => api.score !== 0);
      }
    }

    const newApiList = res
      .filter(filterAccess(access))
      .filter(filterTheme(theme))
      .sort((a, b) => ((a.visits_2019 || 0) < b.visits_2019 ? 1 : -1));

    setApiList(newApiList);
    return () => {};
  }, [theme, access, searchTerms]);

  const lunrOrCustomSearchTerms = search => {
    if (useLunr === true) {
      setFilterSearch([search.replace(' ', '*')]);
    } else {
      const cleanedSearchTerms = search.split(' ').filter(t => !!t);
      setFilterSearch(cleanedSearchTerms);
    }
  };

  return (
    <>
      <FilterHeader
        setFilterTheme={setFilterTheme}
        setFilterAccess={setFilterAccess}
        setFilterSearch={lunrOrCustomSearchTerms}
      />

      <Results apiList={apiList} />
    </>
  );
};

export default SearchApis;
