import React from 'react';
import { InputAdornment, OutlinedInput as MUIOutlinedInput, OutlinedInputProps } from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../../../utils/colors';

interface InputProps extends OutlinedInputProps {
  isInvalid?: boolean;
  inputFieldHeight?: string | number;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    maxLength?: number;
  };
  onChange?: (value: any) => void;
  inputIcon?: React.ReactNode;
  iconClick?: () => void;
}

const StyledInput = styled((props: OutlinedInputProps) => (
  <MUIOutlinedInput {...props} />
))(({ theme }) => ({
    width: '100%',
    color: colors.black,
    fontFamily: 'Poppins',
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: colors.buttonBlue,
      },
      '& .MuiInputBase-input': {
        textAlign: 'center',
        paddingTop: (props: InputProps) => (props.inputProps?.multiple ? 10 : 0),
        '&::placeholder': {
          color: colors.gray,
          fontSize: 16
        },
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.gray,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.buttonBlue,
    },
}));

const OutlinedInput: React.FC<InputProps> = ({
  isInvalid,
  inputFieldHeight,
  inputProps,
  onChange,
  inputIcon,
  iconClick,
  ...props
}) => {

  const handleIconClick = () => {
    if (iconClick) {
      iconClick();
    }
  };

  return (
    <StyledInput
      {...props}
      fullWidth
      error={isInvalid}
      sx={{ height: inputFieldHeight }}
      inputProps={{
        ...inputProps,
        placeholder: inputProps?.placeholder,
        value: inputProps?.value,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
          inputProps?.onChange?.(event);
          onChange?.(event.target.value);
        },
        disabled: inputProps?.disabled,
        maxLength: inputProps?.maxLength,
        multiline: inputProps?.multiple,
      }}
      endAdornment={inputIcon && (
        <InputAdornment position="end" onClick={handleIconClick}>
          {inputIcon}
        </InputAdornment>
      )}
    />
  );
};

export default OutlinedInput;
