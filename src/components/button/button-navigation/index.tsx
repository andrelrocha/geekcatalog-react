import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../utils/colors';

type CustomButtonProps = {
  to: string;
  backgroundColor?: string;
  textColor?: string;
  mt?: number;
  w?: number;
  h?: number;
  br?: number;
};

type ButtonProps = CustomButtonProps & MuiButtonProps;

const ButtonNavigation = (props: ButtonProps) => {
  const navigate = useNavigate();

  const dynamicButtonStyles = {
    backgroundColor: props.backgroundColor || undefined,
    padding: '1rem',
    marginTop: `${props.mt || 0}rem`,
    width: props.w ? `${props.w}rem` : '100%',
    height: `${props.h || 3}rem`,
    borderRadius: `${props.br || 2}rem`,
    justifyContent: 'center',
    alignItems: 'center',
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
      sx={dynamicButtonStyles}
    >
      <span style={textStyles}>{props.children}</span>
    </MuiButton>
  );
};

export default ButtonNavigation;
