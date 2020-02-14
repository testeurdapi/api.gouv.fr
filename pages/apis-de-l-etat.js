import React, { useState, useRef, useEffect } from 'react';
import { orderBy, debounce } from 'lodash';
import lunr from 'lunr';

import withErrors from '../components/hoc/with-errors';

import { getAllAPIs } from '../utils/api';

import Page from '../layouts/page';

import ApiCard from '../components/api-card';

import colors from '../styles/colors';

import { normaliseStr, randomId } from '../utils';

const Search = ({ onSearch, placeholder, debounceRate = 100 }) => {
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

const selectId = `${randomId(5)}-select`;

const DropdownFilter = ({ onChange, label, selectOptions, placeholder }) => {
  const [selected, setSelected] = useState(true);

  const onSelect = index => {
    setSelected(index);
    onChange(index);
  };

  return (
    <>
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} onChange={onSelect}>
        <option value={null}>
          {placeholder || 'Veuillez selectionner une option'}
        </option>
        {selectOptions.map((selectOption, index) => (
          <option
            key={selectOption.value}
            className={selected ? 'selected' : ''}
            value={selectOption.value}
          >
            {selectOption.label}
          </option>
        ))}
      </select>
    </>
  );
};

const BooleanFilter = ({ onChange, label }) => {
  const [isToggle, setIsToggle] = useState(true);

  const onClick = () => {
    const newState = !isToggle;
    setIsToggle(newState);
    onChange(newState);
  };

  return (
    <>
      <button onClick={onClick}>{label}</button>
    </>
  );
};

const filterTheme = selectedTheme => {
  if (!selectedTheme) {
    return () => true;
  }
  return api => api.theme === selectedTheme;
};

const filterAccess = filterAccessOnly => {
  if (!filterAccessOnly) {
    return () => true;
  }
  return api => api.contract === 'OUVERT';
};

const Home = ({ q, filter, allApis }) => {
  const [apiList, setApiList] = useState(allApis);

  const [theme, setFilterTheme] = useState(null);
  const [access, setFilterAccess] = useState(false);
  const [search, setFilterSearch] = useState('');

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
    const results = idx.search(search + '*');

    const resultsApi = results.map(resApi => allApis[parseInt(resApi.ref, 0)]);

    const newApiList = resultsApi
      .filter(filterAccess(access))
      .filter(filterTheme(theme));

    setApiList(newApiList);
    return () => {};
  }, [theme, access, search]);

  return (
    <Page>
      <section id="mission-statement">
        <h3>
          Vous cherchez une API du service public ? Vous êtes au bon endroit !
        </h3>
      </section>
      {JSON.stringify(access)}
      {JSON.stringify(search)}

      <section id="search-params">
        <Search
          onSearch={setFilterSearch}
          placeholder="Recherchez plein de trucs"
        />
        <DropdownFilter
          label="Filtrer par thème"
          onChange={setFilterTheme}
          selectOptions={[{ value: 1, label: 'première option' }]}
        />
        <BooleanFilter
          label="Filtrer par habilitation"
          onChange={value => setFilterAccess(value)}
        />
      </section>

      <section id="apis">
        <div className="ui container">
          <div className="ui three stackable cards">
            {apiList.length > 0 ? (
              orderBy(
                apiList,
                [api => api.visits_2019 || 0],
                ['desc']
              ).map(api => <ApiCard key={api.title} {...api} />)
            ) : (
              <div className="ui big warning message">
                <div className="header">Aucune API n’a pu être trouvée</div>
                Aucun résultat avec le filter: <b>{filter}</b>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        #mission-statement {
          padding-top: 4em;
          padding-bottom: 4em;
        }

        .header-with-image {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .header-with-image img {
          margin-bottom: 1em;
          width: 350px;
        }

        .baseline h2 {
          margin-bottom: 1.5em;
          max-width: 450px;
          text-align: center;
        }

        section {
          padding: 4em 0;
        }

        section#apis {
          background: ${colors.backgroundBlue};
        }

        .links {
          display: flex;
          justify-content: space-between;
          flex-flow: wrap;
        }

        @media (max-width: 768px) {
          #mission-statement {
            padding: 4em 2em;
          }

          .header-with-image img {
            width: 250px;
          }

          .links > div:first-child {
            margin-bottom: 2em;
          }
        }
      `}</style>
    </Page>
  );
};

Home.getInitialProps = async req => {
  const { q, filter } = req.query;
  const allApis = await getAllAPIs();

  return {
    q,
    filter,
    allApis,
  };
};

export default withErrors(Home);
