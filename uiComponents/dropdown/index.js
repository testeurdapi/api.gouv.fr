import React, { useState } from 'react';
import { randomId } from '../../utils';

const selectId = `${randomId(5)}-select`;

const Dropdown = ({ onChange, label, selectOptions, placeholder }) => {
  const [selected, setSelected] = useState(true);

  const onSelect = index => {
    setSelected(index);
    onChange(index);
  };

  return (
    <>
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} onChange={onSelect}>
        <option value={null}>
          {placeholder || 'Veuillez selectionner une option'}
        </option>
        {selectOptions.map((selectOption, index) => (
          <option
            key={selectOption.value}
            className={selected ? 'selected' : ''}
            value={selectOption.value}
          >
            {selectOption.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
