import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, removeCategory, updateCategory } from '../redux/categorySlice';
import Category from './Category';
import '../styles/CategoryList.css';

const CategoryList = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

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

  const handleCategoryBlur = (categoryId, e) => {
    dispatch(updateCategory({ categoryId, updatedName: e.target.value }));
    setEditingCategory(null);
  };

  const handleCategoryKeyPress = (categoryId, e) => {
    if (e.key === 'Enter') {
      dispatch(updateCategory({ categoryId, updatedName: e.target.value }));
      setEditingCategory(null);
    }
  };

  return (
    <div className="category-list-container">
      <div className="category-list">
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            onRemove={() => handleRemoveCategory(category.id)}
            onEdit={() => setEditingCategory(category.id)}
            editing={editingCategory === category.id}
            onCategoryBlur={(e) => handleCategoryBlur(category.id, e)}
            onCategoryKeyPress={(e) => handleCategoryKeyPress(category.id, e)}
          />
        ))}
        {showInput ? (
          <div className="add-category">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Liste başlığı girin..."
            />
            <div className="add-category-actions">
              <button onClick={handleAddCategory}>Listeye Ekle</button>
              <button onClick={handleCancel} className="cancel-button">×</button>
            </div>
          </div>
        ) : (
          <div className="add-category-link" onClick={() => setShowInput(true)}>
            + Liste ekle
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
