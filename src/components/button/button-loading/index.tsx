import React, { useState } from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { colors } from '../../../utils/colors';

type ButtonProps = {
    children: React.ReactNode;
    isLoading?: boolean;
    backgroundColor?: string;
    textColor?: string;
    hoverBackgroundColor?: string;
    hoverTextColor?: string;
    mt?: number;
    w?: number;
    h?: number;
    ph?: number;
    br?: number;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'text' | 'outlined' | 'contained' | undefined;
};

const ButtonLoading = (props: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = {
      backgroundColor: props.backgroundColor || undefined,
      color: props.textColor || colors.whiteSmoke,
      padding: `${props.ph || 1}rem`,
      marginTop: `${props.mt || 0}rem`,
      width: props.w ? `${props.w}rem` : '100%',
      height: `${props.h || 3}rem`,
      opacity: props.isLoading || props.disabled ? 0.5 : 1,
      borderRadius: `${props.br || 2}rem`,
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
  };

  const hoverStyles = isHovered ? {
      backgroundColor: props.hoverBackgroundColor || props.backgroundColor || undefined,
      color: props.hoverTextColor || props.textColor || colors.whiteSmoke,
      boxShadow: `0px 2px 5px ${colors.black}`,
  } : {};

  const dynamicButtonStyles = {
      ...baseStyles,
      ...hoverStyles,
  };

  const textStyles = {
    color: colors.whiteSmoke,
    fontSize: '1rem', 
  };

  return (
    <MuiButton
      onClick={props.onClick}
      disabled={props.isLoading || props.disabled}
      style={dynamicButtonStyles}
      variant={props.variant || 'contained'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {props.isLoading ? (
        <CircularProgress size={16} style={{ color: dynamicButtonStyles.color }} />
      ) : (
        <span style={textStyles}>{props.children}</span>
      )}
    </MuiButton>
  );
};

export default ButtonLoading;
