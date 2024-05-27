import { Route, Router } from '@solidjs/router';
import type { Component } from 'solid-js';

import Auth from 'components/Pages/Auth';
import BookAdd from 'components/Pages/BookAdd';
import BookEdit from 'components/Pages/BookEdit';
import Books from 'components/Pages/Books';
import Config from 'components/Pages/Config';
import FourOhFour from 'components/Pages/FourOhFour';
import Login from 'components/Pages/Login';
import Privacy from 'components/Pages/Privacy';
import Stats from 'components/Pages/Stats';
import Retired from 'components/Pages/Retired';

const App: Component = () => (
  <Router>
    <Route component={Auth} path="/auth" />
    <Route component={Login} path="/login" />
    <Route component={Books} path="/" />
    <Route component={BookAdd} path="/add" />
    <Route component={BookEdit} path="/book/:id" />
    <Route component={Config} path="/config" />
    <Route component={Retired} path="/retired" />
    <Route component={Privacy} path="/privacy" />
    <Route component={Stats} path="/stats" />
    <Route component={FourOhFour} path="*" />
  </Router>
);

export default App;