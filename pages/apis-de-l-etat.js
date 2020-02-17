import React from 'react';

import withErrors from '../components/hoc/with-errors';
import { getAllAPIs } from '../utils/api';
import Page from '../layouts/page';
import SearchApis from '../components/searchApis';
import colors from '../styles/colors';

const Home = ({ allApis }) => {
  return (
    <Page>
      <section id="mission-statement">
        <h3>
          Vous cherchez une API du service public ? Vous êtes au bon endroit !
        </h3>
      </section>

      <SearchApis allApis={allApis} />

      <style jsx>{`
        #mission-statement {
          padding-top: 4em;
          padding-bottom: 4em;
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
