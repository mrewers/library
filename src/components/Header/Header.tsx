import { h } from 'preact';
import Navigation from 'components/Navigation/Navigation';
import s from './Header.module.scss';

interface IHeaderProps {
  readonly title: string;
}

const Header = ({ title }: IHeaderProps): h.JSX.Element => (
  <header>
    <div className={s.container}>
      <h1 className={s.title}>
        <a href="/">{title}</a>
      </h1>
      <Navigation />
    </div>
  </header>
);

Header.displayName = 'Header';

export default Header;
