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

const USE_CASES = [
  {
    title: 'La ville de Nantes',
    content:
      'La Ville de Nantes a mis à disposition de ses usagers un bouquet de e-services qui permettront aux familles nantaises de faire leur inscription administrative, de réserver les places en accueil de loisirs et séjours, ainsi que de régler leurs factures en ligne. Elle collecte les quotients familiaux et avis d’imposition afin de permettre le calcul de la tarification applicable à chaque famille.',
    apis: ['API entreprise'],
    buttonTxt: 'Aidez-moi à simplifier un service administratif',
  },
  {
    title: 'Les transports scolaires de la région Nouvelle-Aquitaine',
    content:
      'La région Nouvelle-Aquitaine propose une dégressivité du tarif des transports scolaires en fonction du revenu fiscal est nécessaire pour vous permettre de bénéficier éventuellement de la dégressivité du tarif. Un service en ligne permet aux familles de s’inscrire et de payer en ligne l’abonnement. Les familles n’ont pas produire de pièce justificative à l’appui de leur démarche.',
    apis: [],

    buttonTxt: 'Je cherche à faciliter les démarches des familles',
  },
  {
    title: 'Le pass metz Loisirs',
    content:
      'Le Pass Metz Loisirs permet aux enfants de pratiquer une activité ( sportive, culturelle ou de loisirs) dans les structures conventionnées ou s’inscrire aux activités socio-éducatives après la classe et le mercredi après-midi. Il est subventionné par la ville pour les familles à faibles revenus sur la base du quotient familial. Les familles n’ont plus à fournir de justificatifs pour cette démarche.',
    apis: [],

    buttonTxt: 'Aidez-moi à dématérialiser des justificatifs',
  },
];

const Home = ({ q, filter, apiList }) => {
  const filteredList = filterAPI(apiList, filter);
  return (
    <Page>
      <section id="mission-statement">
        <div className="header-with-image">
          <h1>
            <TypingCarroussel
              txtBefore="Vous êtes"
              sentences={[
                ' une collectivité ?',
                ' un ministère ?',
                ' un éditeur ?',
              ]}
            />
          </h1>
          <h2>
            Construisez des services innovants en accédant aux données de toutes
            les administrations.
          </h2>
        </div>
      </section>

      <section id="apis">
        <div className="ui container">
          <div className="ui three stackable cards">
            {filteredList.length > 0 ? (
              orderBy(filteredList, [api => api.visits_2019 || 0], ['desc'])
                .slice(0, 3)
                .map(api => <ApiCard key={api.title} {...api} />)
            ) : (
              <div className="ui big warning message">
                <div className="header">Aucune API n’a pu être trouvée</div>
                Aucun résultat avec le filter: <b>{filter}</b>
              </div>
            )}
          </div>
        </div>
      </section>
      {USE_CASES.map(useCase => (
        <section className="use-case ui container">
          <div className="content-wrapper">
            <h2>{useCase.title}</h2>
            <div>{useCase.content}</div>
            {useCase.apis && (
              <div className="apis">
                <b>APIs utilisées :</b> {useCase.apis.join(', ')}
              </div>
            )}
            <a>{useCase.buttonTxt}</a>
          </div>
          <div className="img-wrapper">Img</div>
        </section>
      ))}

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

        section.use-case {
          display: flex;
          flex-direction: row;
          width: 75%;
          color: ${colors.darkestGrey};
        }

        section.use-case:nth-child(even) {
          flex-direction: row-reverse;
        }

        section.use-case > .content-wrapper {
          width: 550px;
          font-size: 17px;
          line-height: 28px;
        }
        section.use-case > .content-wrapper > div.apis {
          margin: 10px 0 20px;
          font-size: 15px;
        }
        section.use-case > .content-wrapper > a {
          font-size: 16px;
          margin-top: 20px;
          color: ${colors.blue};
          cursor: pointer;
        }

        section.use-case > .img-wrapper {
          margin: 0 25px;
          width: calc(100% - 550px);
          background: red;
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
