import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../utils/colors';

type ButtonProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  mt?: number;
  w?: number;
  h?: number;
  br?: number;
  to: string; 
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
};

const ButtonNavigation = (props: ButtonProps) => {
  const navigate = useNavigate();

  const dynamicButtonStyles = {
    backgroundColor: props.backgroundColor || undefined,
    color: props.textColor || colors.whiteSmoke,
    padding: '1rem',
    marginTop: `${props.mt || 0}rem`,
    width: `${props.w || 12}rem`,
    height: `${props.h || 3}rem`,
    borderRadius: `${props.br || 1.2}rem`,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  };

  const textStyles = {
    color: colors.whiteSmoke,
    fontSize: '1.2rem',
  };

  const handleClick = () => {
    if (!props.disabled) {
      navigate(props.to);
    }
  };

  return (
    <MuiButton
      onClick={handleClick}
      disabled={props.disabled}
      style={dynamicButtonStyles}
      variant={props.variant || 'contained'}
    >
      <span style={textStyles}>{props.children}</span>
    </MuiButton>
  );
};

export default ButtonNavigation;
