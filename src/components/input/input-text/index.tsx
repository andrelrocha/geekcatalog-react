import React from 'react';
import { ComponentProps } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { CircularProgress, Box, IconButton } from '@mui/material';
import { Check, Close, Info } from '@mui/icons-material';
import Input from '../input';
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
};

const styles = {
  boxInput: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '25rem',
    margin: '0.5rem 0',
  },
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
}: InputTextProps<T>) => {
  const _formatVisibleValue = formatVisibleValue || ((str: string) => str);
  const _formatInternalValue = formatInternalValue || ((str: string) => str);
  const _visibleValidation = visibleValidation ?? true;

  const handleInputIcon = (isValid: boolean, isInvalid: boolean) => {
    if ((icon && !isValid && !isInvalid) || staticIcon) {
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
          <Box sx={styles.boxInput}>
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
