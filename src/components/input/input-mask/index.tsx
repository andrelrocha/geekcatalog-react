import React from 'react';
import InputMask from 'react-input-mask';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { OutlinedInput, InputAdornment, FormControl, FormHelperText } from '@mui/material';

interface InputMaskedProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  mask: (string | RegExp)[];
  placeholder?: string;
  rules?: RegisterOptions<T, Path<T>>;
  inputProps?: React.ComponentProps<typeof OutlinedInput>;
  icon?: React.ReactNode;
  visibleValidation?: boolean;
  maskPlaceholder?: string;
}

const InputMasked = <T extends FieldValues>({
  control,
  name,
  mask,
  placeholder,
  rules,
  inputProps,
  icon,
  visibleValidation,
  maskPlaceholder,
}: InputMaskedProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { invalid } }) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        };

        return (
          <FormControl fullWidth variant="outlined" error={!!invalid}>
            <InputMask
              mask={mask}
              // @ts-ignore
              value={value || ''} 
              onChange={handleChange}
              {...inputProps}
              maskChar=""
              alwaysShowMask={false}
              maskPlaceholder={maskPlaceholder}
              render={(ref: any, props: any) => (
                <OutlinedInput
                  {...props}
                  inputRef={ref}
                  label={placeholder}
                  endAdornment={icon && (
                    <InputAdornment position="end">
                      {icon}
                    </InputAdornment>
                  )}
                />
              )}
            />
            {visibleValidation && invalid && (
              // @ts-ignore
              <FormHelperText>{rules?.validate?.message || 'Invalid input'}</FormHelperText>
            )}
          </FormControl>
        );
      }}
      rules={rules}
    />
  );
};

export default InputMasked;
