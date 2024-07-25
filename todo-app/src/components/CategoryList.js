import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCategory } from '../redux/categorySlice';
import Category from './Category';
import '../styles/CategoryList.css';

const CategoryList = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  const handleRemoveCategory = (categoryId) => {
    dispatch(removeCategory(categoryId));
  };

  return (
    <div className="category-list-container">
      {categories.map((category) => (
        <Category 
          key={category.id} 
          category={category} 
          onRemove={() => handleRemoveCategory(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
