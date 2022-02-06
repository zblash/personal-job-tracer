import * as React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

const Page404 = React.lazy(() => import('./404-component').then(module => ({ default: module.Page404 })));
const HomePage = React.lazy(() => import('./home').then(module => ({ default: module.HomePage })));

interface IRoute {
  path: string;
  basePath: string;
  component: React.ComponentClass | React.FunctionComponent;
  disabled?: boolean;
}

export const RoutesList: IRoute[] = [{ path: '/', basePath: '/', component: HomePage }];

const Routes = React.memo(() => {
  return (
    <div>
      <Switch>
        {RoutesList.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <React.Suspense fallback={'Loading'}>
                <route.component />
              </React.Suspense>
            }
          />
        ))}
        <Route
          element={
            <React.Suspense fallback={'Loading'}>
              <Page404 />
            </React.Suspense>
          }
        />
      </Switch>
    </div>
  );
});

export default Routes;
