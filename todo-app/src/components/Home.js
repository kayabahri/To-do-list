import React from 'react';
import CategoryList from './CategoryList';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* "Yapılacaklar Listesi" başlığını ve butonları kaldırıyoruz */}
      <CategoryList />
    </div>
  );
};

export default Home;
