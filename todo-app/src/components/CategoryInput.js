import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../redux/categorySlice';

const CategoryInput = () => {
  const [categoryName, setCategoryName] = useState('');
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      dispatch(addCategory(categoryName));
      setCategoryName('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Yeni bir kategori ekle"
      />
      <button onClick={handleAddCategory}>Kategori Ekle</button>
    </div>
  );
};

export default CategoryInput;
