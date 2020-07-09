import { h } from 'preact';

const ListItem = ({ title }: { title: string }) => (
  <article>
    <strong>{title}</strong>
  </article>
);

export default ListItem;
