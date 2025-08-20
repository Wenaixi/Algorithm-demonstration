import React, { useState, useRef, useEffect } from 'react';

const EditableNumber = ({ 
  value, 
  onChange, 
  min, 
  max, 
  label, 
  unit = '', 
  id 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);
  
  // 当value改变时更新inputValue
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  // 激活编辑模式
  const activateEditing = () => {
    setIsEditing(true);
    setInputValue(value);
  };
  
  // 处理输入变化
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  // 验证并调整输入值到有效范围
  const validateAndAdjustValue = (val) => {
    const numValue = Number(val);
    
    // 如果不是有效数字，返回原值
    if (isNaN(numValue)) {
      return value;
    }
    
    // 自动调整到有效范围
    if (numValue < min) {
      return min;
    }
    
    if (numValue > max) {
      return max;
    }
    
    return numValue;
  };
  
  // 保存更改
  const saveChanges = () => {
    const adjustedValue = validateAndAdjustValue(inputValue);
    onChange(adjustedValue);
    setIsEditing(false);
  };
  
  // 取消编辑
  const cancelEditing = () => {
    setInputValue(value);
    setIsEditing(false);
  };
  
  // 处理键盘事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveChanges();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };
  
  // 处理失去焦点
  const handleBlur = () => {
    saveChanges();
  };
  
  // 聚焦到输入框
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  // 渲染编辑模式
  if (isEditing) {
    return (
      <div className="editable-number editable-number--editing">
        <span className="editable-number__label">{label}</span>
        <input
          ref={inputRef}
          id={id}
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          min={min}
          max={max}
          className="editable-number__input"
        />
        <span className="editable-number__unit">{unit}</span>
      </div>
    );
  }
  
  // 渲染显示模式
  return (
    <div className="editable-number" onClick={activateEditing}>
      <span className="editable-number__label">{label}</span>
      <span className="editable-number__value">{value}</span>
      <span className="editable-number__unit">{unit}</span>
    </div>
  );
};

export default EditableNumber;