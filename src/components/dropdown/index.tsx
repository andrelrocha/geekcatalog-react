import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Control, Controller } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { DropdownData } from '../../types/utils/dropDownDTO';
import { colors } from '../../utils/colors';

interface DropdownProps {
    name: string;
    control: Control<any>;
    options: DropdownData[];
    placeholder?: string;
    icon?: React.ReactNode;
    mb?: number;
    mt?: number;
    h?: number;
    br?: number;
    label?: string;
    labelDisplay?: string;
    [key: string]: any; 
}

const styles = {
    labelText: {
        alignSelf: 'flex-start', 
        marginBottom: '0.5rem',
        fontFamily: 'Poppins',
    },
}

const DropdownSelection: React.FC<DropdownProps> = ({
  name,
  control,
  options,
  placeholder,
  icon,
  mb,
  mt,
  h,
  br,
  label,
  labelDisplay,
  ...props
}) => {
    const [dropdownOptions, setDropdownOptions] = useState<DropdownData[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      setDropdownOptions(options);
    }, [options]);

    return (
      <Box sx={{ position: 'relative', marginBottom: mb || 0, marginTop: mt || 0 }}>
        {label && (
          <Typography sx={styles.labelText}>
            {labelDisplay}
          </Typography>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              {...props}
              options={dropdownOptions}
              placeholder={isFocused ? '' : placeholder}
              onChange={(selectedOption) => {
                onChange(selectedOption?.value);
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={dropdownOptions.find(option => option.value === value)}
              styles={{
                control: (base) => ({
                  ...base,
                  height: h || 50,
                  borderRadius: br || 4,
                  borderWidth: 1,
                  boxShadow: isFocused ? '0 0 0 1px #2684FF' : 'none',
                  borderColor: isFocused ? colors.buttonBlue : colors.gray,
                  '&:hover': {
                    borderColor: colors.black,
                  },
                }),
                placeholder: (base) => ({
                  ...base,
                  fontSize: 16,
                  color: colors.gray,
                }),
                singleValue: (base) => ({
                  ...base,
                  fontSize: 16,
                  color: '#000',
                }),
              }}
            />
          )}
        />
      </Box>
    );
};

export default DropdownSelection;
