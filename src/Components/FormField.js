import React from 'react';

const FormField = ({
    label,
    type,
    id,
    name,
    value,
    onChange,
    placeholder,
    options,
}) => (
    <div className="mb-3">
        <label htmlFor={id} className="form-label">
            {label}:
        </label>
        {type === 'select' ? (
            <select
                className="form-select"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        ) : (
            <input
                type={type}
                className="form-control"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        )}
    </div>
);

export default FormField;