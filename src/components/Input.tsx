import { ChangeEvent } from 'react';

type InputProps = {
  label: string;
  inputType: 'text' | 'number';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string | number | null;
};

function Input({ label, inputType, onChange, value,  }: InputProps) {
  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input
        name={label}
        value={value ? value : ''}
        onChange={onChange}
        type={inputType}
      />
    </div>
  );
}

export default Input;
