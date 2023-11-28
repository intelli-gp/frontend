import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { GoSync } from 'react-icons/go';
type ButtonType = 'button' | 'submit' | 'reset' | undefined;

type choice =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'primary700'
  | 'primary500';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: ButtonType;
  select?: choice;
  rounded?: boolean;
  loading?: boolean;
  styles?: string;
  className?: string;
  outline?:boolean;
}

function Button({
  children,
  type='button',
  select='primary',
  rounded=true,
  loading=false,
  styles='',
  className,
  outline=false,
  ...rest
}: ButtonProps): JSX.Element {
  const classes = classNames(
    className,
    `${styles}   focus:ring-0 focus:outline-none font-medium text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 h-8 `,
    {
      'opacity-80': loading,
      'bg-indigo-900 hover:bg-indigo-900/90 text-white': select === 'primary',
      'bg-indigo-700 hover:bg-indigo-700/90 text-white': select === 'primary700',
      'bg-indigo-500 hover:bg-indigo-500/90 text-white': select === 'primary500',
      'bg-secondary hover:secondary/90 text-txt': select === 'secondary',
      'bg-green-500 text-white': select === 'success',
      'bg-yellow-400 text-white': select === 'warning',
      'hover:bg-red-500/90 bg-red-500 text-white': select === 'danger',
      'rounded': rounded,
      'border-indigo-900 text-indigo-900':   outline &&(select === 'primary'),
      'border-secondary text-secondary': outline &&(select === 'secondary'),
      'border-green-500  text-green-500':outline &&(select === 'success'),
      'border-yellow-400 text-yellow-400': outline &&(select === 'warning'),
      'border-red-500 text-red-500': outline &&(select === 'danger'),

    }
  );

  return (
    <button
      disabled={loading}
      className={classes}
      {...rest}
    >
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
}



export default Button;



