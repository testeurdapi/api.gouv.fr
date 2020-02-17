import React from 'react';

import ApiCard from './apiCard';

const Results = ({ apiList, searchTerms }) => {
  return (
    <section id="apis">
      <div className="ui container">
        <div className="ui three stackable cards">
          {apiList.length > 0 ? (
            apiList.map(api => <ApiCard key={api.title} {...api} />)
          ) : (
            <div className="ui big warning message">
              <div className="header">Aucune API n’a pu être trouvée</div>
              Aucun résultat trouvé pour la recherche.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Results;
