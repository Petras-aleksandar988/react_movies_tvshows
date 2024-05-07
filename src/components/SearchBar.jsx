import React from 'react'

export default function SearchBar({ placeholder, value, onChange }) {
  console.log(value);
    return (
        <div className="search">
          {/* Apply props to the input element */}
          <input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      );
}
