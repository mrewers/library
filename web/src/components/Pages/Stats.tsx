import { For } from 'solid-js';

import Layout from 'components/Layout/Layout';

import { useReaders } from 'context/ReaderProvider';
import { useBooks } from 'context/BookProvider';

import type { Component, JSX } from 'solid-js';

import s from './Pages.module.scss';

const Stats: Component = () => {
  const [readerList] = useReaders();
  const [bookList] = useBooks();
  
  return (
    <Layout stats={false}>
      <div>
        <h1 class={s.subhead}>Reading Stats</h1>
        <div class={s['table-wrapper']}>
          <table class={s.table}>
            <thead>
              <tr>
                <th>Reader</th>
                <th>Books Read</th>
                <th>Books Unread</th>
                <th>Percent Read</th>
              </tr>
            </thead>
            <tbody>
              <For each={readerList}>
                { (r): JSX.Element => {
                  const readerIndex = bookList().filtered.findIndex(i => i.name === r.name);

                  const read = bookList().filtered[readerIndex].read.length;
                  const unread = bookList().filtered[readerIndex].unread.length;

                  return (
                    <tr>
                      <td>
                        {r.name}
                      </td>
                      <td>
                        {read}
                      </td>
                      <td>
                        {unread}
                      </td>
                      <td>
                        {`${Math.round((read / bookList().fullList.active.length) * 100)}%`}
                      </td>
                    </tr>
                  )
                }}
              </For>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
};

export default Stats;