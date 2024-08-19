import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, removeCategory } from '../redux/categorySlice';
import Category from './Category';
import { useTranslation } from 'react-i18next';
import '../styles/CategoryList.css';

const CategoryList = () => {
  const { t } = useTranslation();
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      dispatch(addCategory(categoryName));
      setCategoryName('');
      setShowInput(false);
    }
  };

  const handleCancel = () => {
    setCategoryName('');
    setShowInput(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCategory();
    }
  };

  const handleRemoveCategory = (categoryId) => {
    dispatch(removeCategory(categoryId));
  };

  return (
    <div className="category-list">
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          onRemove={() => handleRemoveCategory(category.id)}
        />
      ))}
      {showInput ? (
        <div className="add-category">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('Enter the list title...')}
          />
          <div className="add-category-actions">
            <button onClick={handleAddCategory}>{t('Add to list')}</button>
            <button onClick={handleCancel} className="cancel-button">×</button>
          </div>
        </div>
      ) : (
        <div className="add-category-link" onClick={() => setShowInput(true)}>
          {t('+ List add')}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
