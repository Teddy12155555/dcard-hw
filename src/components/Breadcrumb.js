import React from 'react';
import { matchRoutes } from 'react-router-config';
import routes from '../routes';

const Breadcrumb = ({ locationPath, onMatchedRoutes }) => {
  let matchedRoutes = matchRoutes(routes, locationPath);

  if (typeof onMatchedRoutes === 'function') {
    matchedRoutes = onMatchedRoutes(matchedRoutes);
  }

  return (
    <nav>
      <ol className="breadcrumb" >
        {matchedRoutes.map((matchRoute, i) => {
          const { path, breadcrumbName } = matchRoute.route;

          return (
            <li key={i} className="breadcrumb-item active">
              {breadcrumbName}
            </li>
          )
        })}
      </ol>
    </nav>
  );
};

export { Breadcrumb };
