import styles from './Header.module.css';
import classNames from 'classnames';
import { FC } from 'react';

interface HeaderProps {
  selectedTab: 'applications' | 'form';
  setSelectedTab: (tab: 'applications' | 'form') => void;
}

export const Header: FC<HeaderProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <header>
      <div
        className={classNames(styles.headerItem, {
          [styles.active]: selectedTab === 'applications',
        })}
        onClick={() => {
          setSelectedTab('applications');
        }}
      >
        Все заявки
      </div>
      <div
        className={classNames(styles.headerItem, {
          [styles.active]: selectedTab === 'form',
        })}
        onClick={() => {
          setSelectedTab('form');
        }}
      >
        Создание заявки
      </div>
    </header>
  );
};
