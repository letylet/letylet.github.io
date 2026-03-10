import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "px-6 py-2 rounded-full font-bold transition-all duration-200 transform flex items-center justify-center gap-2 active:scale-90";
  
  const variants = {
    primary: "bg-cv-primary text-white shadow-lg md:hover:bg-cyan-700 md:hover:shadow-xl md:hover:-rotate-1",
    secondary: "bg-cv-green text-white shadow-md md:hover:bg-teal-600 md:hover:scale-105",
    outline: "border-2 border-cv-primary text-cv-primary md:hover:bg-cv-primary md:hover:text-white md:hover:scale-105"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;