import React, { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { DataLoader } from './dataloader';

// function component
const ScenicSpot = ({ location }) => {
    const [city, setCity] = useState('init');
    const onMatchedRoutes = (matchedRoutes) => {
      const _matchedRoutes = matchedRoutes.map((matchedRoute) => {
            if (matchedRoute.match && matchedRoute.match.path === '/scenicSpot/:id') {
                const cityName = matchedRoute.match.params && matchedRoute.match.params.id;
                // Citys
                setCity(`\/${cityName}`);
                return {
                    match: matchedRoute.match,
                    route: {
                        ...matchedRoute.route,
                        path: matchedRoute.match.url,
                        breadcrumbName: cityName,
                    },
                };
            }else {
              setCity('');
              return {
                match: matchedRoute.match,
                route: {
                    ...matchedRoute.route,
                    path: matchedRoute.match.url,
                },
            };
          }
      });
      return [
      {
        route: {
          path: '/',
          breadcrumbName: 'Home Page',
        },
      },
      ..._matchedRoutes,
      ];
  };
  return (
    city == '' ? 
    (
      <div>
          <h1 className="py-3">All ScenicSpot</h1>
          <Breadcrumb locationPath={location.pathname} onMatchedRoutes={onMatchedRoutes} />
          <DataLoader url={`ScenicSpot${city}`}/>
      </div>
    ): (
      <div>
          <h1 className="py-3">{city.substring(1)}</h1>
          <Breadcrumb locationPath={location.pathname} onMatchedRoutes={onMatchedRoutes} />
          <DataLoader url={`ScenicSpot${city}`}/>
      </div>
    )
  );
};

export { ScenicSpot };
//<DataLoader url='ScenicSpot'/>
//<DataLoader url={`ScenicSpot/${city}`}/>