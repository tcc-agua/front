import React from 'react';
import '../styles/Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', disabled = false }) => {
  return (
    <button className="custom-button" onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
