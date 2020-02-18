import React from 'react';

import './useCaseSectionStyles.scss';

const USE_CASES = [
  {
    title: 'La ville de Nantes',
    content:
      'La Ville de Nantes a mis à disposition de ses usagers un bouquet de e-services qui permettront aux familles nantaises de faire leur inscription administrative, de réserver les places en accueil de loisirs et séjours, ainsi que de régler leurs factures en ligne. Elle collecte les quotients familiaux et avis d’imposition afin de permettre le calcul de la tarification applicable à chaque famille.',
    apis: ['API entreprise'],
    picture: '/images/home/nantes.jpg',
    buttonTxt: 'Aidez-moi à simplifier un service administratif',
  },
  {
    title: 'Les transports scolaires de la région Nouvelle-Aquitaine',
    content:
      'La région Nouvelle-Aquitaine propose une dégressivité du tarif des transports scolaires en fonction du revenu fiscal est nécessaire pour vous permettre de bénéficier éventuellement de la dégressivité du tarif. Un service en ligne permet aux familles de s’inscrire et de payer en ligne l’abonnement. Les familles n’ont pas produire de pièce justificative à l’appui de leur démarche.',
    apis: [],
    picture: '/images/home/nouvelleAquitaine.jpg',
    buttonTxt: 'Je cherche à faciliter les démarches des familles',
  },
  {
    title: 'Le pass metz Loisirs',
    content:
      'Le Pass Metz Loisirs permet aux enfants de pratiquer une activité ( sportive, culturelle ou de loisirs) dans les structures conventionnées ou s’inscrire aux activités socio-éducatives après la classe et le mercredi après-midi. Il est subventionné par la ville pour les familles à faibles revenus sur la base du quotient familial. Les familles n’ont plus à fournir de justificatifs pour cette démarche.',
    apis: [],
    picture: '/images/home/metz.jpg',
    buttonTxt: 'Aidez-moi à dématérialiser des justificatifs',
  },
];

const UseCaseSection = () => (
  <section id="use-cases" className="content-container">
    {USE_CASES.map(useCase => (
      <div className="use-case">
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
        <div className="img-wrapper">
          <img src={useCase.picture} />
        </div>
      </div>
    ))}
  </section>
);

export default UseCaseSection;
