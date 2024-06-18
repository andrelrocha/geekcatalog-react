import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { colors } from '../../../utils/colors';

type ButtonProps = {
    children: React.ReactNode;
    isLoading?: boolean;
    backgroundColor?: string;
    textColor?: string;
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
  const dynamicButtonStyles = {
    backgroundColor: props.backgroundColor || undefined,
    color: props.textColor || colors.whiteSmoke,
    padding: `${props.ph || 1}rem`,
    marginTop: `${props.mt || 0}rem`,
    width: `${props.w || 12}rem`,
    height: `${props.h || 3}rem`,
    opacity: props.isLoading || props.disabled ? 0.5 : 1,
    borderRadius: `${props.br || 1.2}rem`,
    justifyContent: 'center',
    alignItems: 'center',
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
