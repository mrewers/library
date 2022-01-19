import { h } from 'preact';

import s from './List.module.scss';

import ListItem from 'components/ListItem/ListItem';

interface IListProps {
  readonly list: TypeBookList;
  readonly read: TypeBookList;
}

const List = ({ list, read }: IListProps): h.JSX.Element => (
  <section>
    {list.length === 0 && <div className={s.loader}>Loading...</div>}
    {list.length > 0 && (
      <ul className={s.list}>
        {list.map(item => (
          <li key={item.id} className={read.includes(item) ? s.read : ''}>
            <ListItem item={item} />
          </li>
        ))}
      </ul>
    )}
  </section>
);

List.displayName = 'List';

export default List;
