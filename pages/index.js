import React from 'react';
import getConfig from 'next/config';
import { orderBy } from 'lodash';

import withErrors from '../components/hoc/with-errors';

import { getAllAPIs } from '../utils/api';

import Page from '../layouts/page';

import ApiCard from '../components/searchApis/apiCard';

import { TypingCarroussel } from '../uiComponents';

import colors from '../styles/colors';

import { normaliseStr } from '../utils/normalize';

const { publicRuntimeConfig } = getConfig();
const SITE_DESCRIPTION =
  publicRuntimeConfig.SITE_DESCRIPTION ||
  'Simplifiez le partage et la circulation des données administratives';

const filterAPI = (list, filter) => {
  let filteredList = list;

  if (filter) {
    filteredList = list.filter(api => {
      const normalizeKeywords = api.keywords.map(k => normaliseStr(k));
      return normalizeKeywords.includes(normaliseStr(filter));
    });
  }

  return filteredList;
};

const Home = ({ q, filter, apiList }) => {
  const filteredList = filterAPI(apiList, filter);
  return (
    <Page>
      <section id="mission-statement">
        <div className="header-with-image">
          <h1>
            <TypingCarroussel
              txtBefore="Vous êtes "
              sentences={[
                'une collectivité ?',
                'un ministère ?',
                'un éditeur ?',
              ]}
            />
          </h1>
          <h3>
            Construisez des services innovants en accédant aux données de toutes
            les administrations.
          </h3>
        </div>
      </section>

      <section id="apis">
        <div className="ui container">
          <div className="ui three stackable cards">
            {filteredList.length > 0 ? (
              orderBy(
                filteredList,
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
  const apiList = await getAllAPIs();

  return {
    q,
    filter,
    apiList,
  };
};

export default withErrors(Home);
