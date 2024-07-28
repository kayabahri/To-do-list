// src/components/Home.js
import React from 'react';
import CategoryInput from './CategoryInput';
import CategoryList from './CategoryList';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="todo-container">
      <div className="todo-box">
        <h1 className="todo-title">{t('Yapılacaklar Listesi')}</h1>
        <CategoryInput />
      </div>
      <CategoryList />
    </div>
  );
};

export default Home;
