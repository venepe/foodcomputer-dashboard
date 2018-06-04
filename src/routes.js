import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Snapshots = Loadable({
  loader: () => import('./views/Snapshots'),
  loading: Loading,
});

const SnapshotDetail = Loadable({
  loader: () => import('./views/SnapshotDetail'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/snapshots/:id', name: 'Snapshots', component: SnapshotDetail },
  { path: '/snapshots', name: 'Snapshots', component: Snapshots },
];

export default routes;
