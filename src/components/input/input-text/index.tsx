import React from 'react';
import { ComponentProps } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { CircularProgress, Box, IconButton, Typography } from '@mui/material';
import { Check, Close, Info } from '@mui/icons-material';
import Input from '../input-outlined-base';
import { colors } from '../../../utils/colors';

type InputTextProps<T extends FieldValues> = {
  control: Control<T>;
  formatInternalValue?: (str: string) => string;
  formatVisibleValue?: (str: string) => string;
  icon?: React.ReactNode;
  iconClick?: () => void;
  staticIcon?: boolean;
  inputProps?: ComponentProps<typeof Input>['inputProps'];
  isLoading?: boolean;
  name: Path<T>;
  placeholder?: string;
  rules?: ComponentProps<typeof Controller<T>>['rules'];
  visibleValidation?: boolean;
  bColorFocus?: string;
  editable?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  label?: string;
  downComponent?: React.ReactNode;
};

const styles = {
  boxInput: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: '0.5rem 0',
  },
  labelText: {
   alignSelf: 'flex-start', 
   marginBottom: '0.5rem',
   fontFamily: 'Poppins',
  },
  bottomElement: {
    alignSelf: 'flex-start',
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
    color: colors.buttonBlue, 
    textDecoration: 'none'
  }
};

const InputText = <T extends FieldValues>({
  control,
  formatInternalValue,
  formatVisibleValue,
  icon,
  iconClick,
  staticIcon,
  inputProps,
  isLoading,
  name,
  placeholder,
  rules,
  visibleValidation,
  editable = true,
  numberOfLines = 1,
  maxLength,
  label,
  downComponent,
}: InputTextProps<T>) => {
  const _formatVisibleValue = formatVisibleValue || ((str: string) => str);
  const _formatInternalValue = formatInternalValue || ((str: string) => str);
  const _visibleValidation = visibleValidation ?? true;

  const handleInputIcon = (isValid: boolean, isInvalid: boolean) => {
    if ((icon && !isValid && !isInvalid) || staticIcon) {
      return (
        <IconButton tabIndex={-1}>
          {icon}
        </IconButton>
      );
    } else if (isValid && _visibleValidation) {
      return (
        <IconButton tabIndex={-1}>
          <Check color="success" />
        </IconButton>
      );
    } else if (isInvalid && _visibleValidation) {
      return (
        <IconButton tabIndex={-1}>
          <Close color="error" />
        </IconButton>
      );
    }
    return (
      <IconButton tabIndex={-1}>
        <Info color="action" />
      </IconButton>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { invalid } }) => {
        const externalValue = _formatVisibleValue(value) || '';
        const isInvalid = externalValue.length > 0 && invalid;
        const isValid = externalValue.length > 0 && !invalid;
        const inputFieldHeight = numberOfLines > 1 ? numberOfLines * 50 : 50;

        return (
          <Box sx={styles.boxInput}>
            {label && <Typography style={styles.labelText}>{label}</Typography>}
            <Input
              inputFieldHeight={inputFieldHeight}
              inputProps={{
                ...inputProps,
                placeholder,
                value: externalValue,
                onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(_formatInternalValue(event.target.value));
                },
                disabled: !editable,
                maxLength,
              }}
              isInvalid={isInvalid}
              inputIcon={handleInputIcon(isValid, isInvalid)}
              iconClick={iconClick}
              />
            {downComponent && React.cloneElement(downComponent as React.ReactElement, { style: styles.bottomElement })}
            {isLoading && (
              <Box sx={{ position: 'absolute', right: '10px' }}>
                <CircularProgress size={20} color="inherit" />
              </Box>
            )}
          </Box>
        );
      }}
      rules={rules}
    />
  );
};

export default InputText;
