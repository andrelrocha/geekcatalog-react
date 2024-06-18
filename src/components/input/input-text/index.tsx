import React from 'react';
import { ComponentProps } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TextFieldProps, CircularProgress, Box, IconButton } from '@mui/material';
import { Check, Close, Info } from '@mui/icons-material';
import Input from '../input';

type InputTextProps<T extends FieldValues> = {
  control: Control<T>;
  formatInternalValue?: (str: string) => string;
  formatVisibleValue?: (str: string) => string;
  icon?: React.ReactNode;
  inputProps?: TextFieldProps;
  isLoading?: boolean;
  name: Path<T>;
  placeholder?: string;
  rules?: ComponentProps<typeof Controller<T>>['rules'];
  visibleValidation?: boolean;
  staticIcon?: boolean;
  bColorFocus?: string;
  editable?: boolean;
  numberOfLines?: number;
  maxLength?: number;
} & ComponentProps<typeof Input>;

const InputText = <T extends FieldValues>({
  control,
  formatInternalValue,
  formatVisibleValue,
  icon,
  inputProps,
  isLoading,
  name,
  placeholder,
  rules,
  visibleValidation,
  staticIcon,
  editable,
  numberOfLines = 1,
  maxLength,
  ...props
}: InputTextProps<T>) => {
  const _formatVisibleValue = formatVisibleValue || ((str: string) => str);
  const _formatInternalValue = formatInternalValue || ((str: string) => str);
  const _visibleValidation = visibleValidation ?? true;

  const handleInputIcon = (isValid: boolean, isInvalid: boolean) => {
    if (icon && !isValid && !isInvalid) {
      return (
        <IconButton>
          {icon}
        </IconButton>
      );
    } else if (isValid && _visibleValidation) {
      return (
        <IconButton>
          <Check color="success" />
        </IconButton>
      );
    } else if (isInvalid && _visibleValidation) {
      return (
        <IconButton>
          <Close color="error" />
        </IconButton>
      );
    }
    return (
      <IconButton>
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
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Input
              isInvalid={isInvalid}
              {...props}
              style={{ height: inputFieldHeight }}
              inputProps={{
                ...inputProps,
                placeholder: placeholder,
                value: externalValue,
                onChange: (newValue: string) => onChange(_formatInternalValue(newValue)),
                disabled: !editable,
                multiline: numberOfLines > 1,
                style: { paddingTop: numberOfLines > 1 ? 10 : 0 },
                inputProps: { maxLength: maxLength },
              }}
            />
            {handleInputIcon(isValid, isInvalid)}
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
