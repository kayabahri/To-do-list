import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../redux/categorySlice';
import '../styles/CategoryInput.css';

const CategoryInput = () => {
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (category.trim()) {
      dispatch(addCategory(category));
      setCategory('');
    }
  };

  return (
    <div className="category-input">
      <input 
        type="text" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        placeholder="Add a new category" 
      />
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
};

export default CategoryInput;
