import React from 'react';

import withErrors from '../components/hoc/with-errors';
import { getAllAPIs } from '../utils/api';
import Page from '../layouts/page';
import SearchApis from '../components/searchApis';
import { HEADER_PAGE } from '../components/header';

const Home = ({ allApis }) => {
  return (
    <Page headerKey={HEADER_PAGE.APIS}>
      <section id="mission-statement" className="baseline">
        <h2>
          Vous recherchez une API du service public ? Vous êtes au bon endroit !
        </h2>
      </section>

      <SearchApis allApis={allApis} />

      <style jsx>{`
        #mission-statement {
          margin: 2em 0;
        }

        .baseline h2 {
          margin: auto;
          margin-bottom: 1.5em;
          max-width: 480px;
          text-align: center;
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
