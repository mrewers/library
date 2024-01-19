import type { Component } from 'solid-js';

import Layout from 'components/Layout/Layout';
import gifUrl from '../../../public/assets/public/to-the-library.gif'

import s from './Pages.module.scss';

const FourOhFour: Component = () => (
  <Layout stats={false}>
    <div>
      <h1 class={s.subhead}>404: Page Not Found</h1>
      <figure class={s.gif}>
        <img src={gifUrl} />
      </figure>
    </div>
  </Layout>
);

export default FourOhFour;
