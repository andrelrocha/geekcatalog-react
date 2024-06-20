import React, { useState } from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../utils/colors';

type CustomButtonProps = {
  to: string;
  backgroundColor?: string;
  textColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  mt?: number;
  w?: number;
  h?: number;
  br?: number;
};

type ButtonProps = CustomButtonProps & MuiButtonProps;

const ButtonNavigation = (props: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const baseStyles = {
      backgroundColor: props.backgroundColor || undefined,
      color: props.textColor || colors.whiteSmoke,
      padding: `1 rem`,
      marginTop: `${props.mt || 0}rem`,
      width: props.w ? `${props.w}rem` : '100%',
      height: `${props.h || 3}rem`,
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
    color: props.textColor || colors.whiteSmoke,
    fontSize: '1rem',
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
      variant={props.variant || 'contained'}
      style={dynamicButtonStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={textStyles}>{props.children}</span>
    </MuiButton>
  );
};

export default ButtonNavigation;
