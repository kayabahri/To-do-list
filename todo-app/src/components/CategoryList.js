import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, addCategory, removeCategory, updateCategory } from '../redux/thunks/categoryThunks';
import Category from './Category';
import '../styles/CategoryList.css';

const CategoryList = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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

  const handleEditCategory = (categoryId, categoryName) => {
    setEditingCategoryId(categoryId);
    setEditingCategoryName(categoryName);
  };

  const handleUpdateCategory = () => {
    if (editingCategoryName.trim()) {
      dispatch(updateCategory({ categoryId: editingCategoryId, newName: editingCategoryName }));
      setEditingCategoryId(null);
      setEditingCategoryName('');
    }
  };

  const handleCategoryKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUpdateCategory();
    }
  };

  const handleCategoryBlur = () => {
    handleUpdateCategory();
  };

  return (
    <div className="category-list-container">
      <div className="category-list">
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            onRemove={() => handleRemoveCategory(category.id)}
            onEdit={() => handleEditCategory(category.id, category.name)}
            editing={editingCategoryId === category.id}
            onCategoryBlur={handleCategoryBlur}
            onCategoryKeyPress={handleCategoryKeyPress}
            onChange={(e) => setEditingCategoryName(e.target.value)}
            editingCategoryName={editingCategoryName}
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
