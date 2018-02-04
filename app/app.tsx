import React from 'react';
import ReactDOM from 'react-dom';
import {Route, MemoryRouter} from 'react-router';

import ConfigPage from './pages/ConfigPage';

const App = () => (
  <MemoryRouter>
    <Route path="/" render={() => <ConfigPage / >} />
  </MemoryRouter>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
