import { Route, Router, Routes } from '@solidjs/router';
import type { Component } from 'solid-js';

import Auth from 'components/Pages/Auth';
import BookAdd from 'components/Pages/BookAdd';
import BookEdit from 'components/Pages/BookEdit';
import Books from 'components/Pages/Books';
import FourOhFour from 'components/Pages/FourOhFour';
import Login from 'components/Pages/Login';
import Privacy from 'components/Pages/Privacy';
import Retired from 'components/Pages/Retired';

const App: Component = () => (
  <Router>
    <Routes>
      <Route component={Auth} path="/auth" />
      <Route component={Login} path="/login" />
      <Route component={Books} path="/" />
      <Route component={BookAdd} path="/add" />
      <Route component={BookEdit} path="/book/:id" />
      <Route component={Retired} path="/retired" />
      <Route component={Privacy} path="/privacy" />
      <Route component={FourOhFour} path="*" />
    </Routes>
  </Router>
);

export default App;