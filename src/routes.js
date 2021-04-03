import { ScenicSpot } from './components/scenicspot';
import { HomePage } from './components/homepages';

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    breadcrumbName: 'Home Page'
  },
  {
    path: '/scenicSpot',
    component: ScenicSpot,
    breadcrumbName: 'Scenic Spot',
    routes: [
      {
        path: '/scenicSpot/:id',
        component: ScenicSpot,
      }
    ]
  }
];

export default routes;
