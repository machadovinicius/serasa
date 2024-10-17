import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  style,
  type = 'button',
}) => {
  return (
    <button
      onClick={onClick}
      style={{ padding: '10px 15px', ...style }}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
