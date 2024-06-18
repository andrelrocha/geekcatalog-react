import React from 'react';
import { TextField, Box } from '@mui/material';
import { colors } from '../../../utils/colors';

const Input = ({
  height = 50,
  borderColor = colors.gray,
  borderWidth = 1,
  borderRadius = 5,
  paddingHorizontal = 10,
  marginBottom = 10,
  inputProps = {},
  ...props
}) => {
  const styles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: `${height}px`,
    borderColor: borderColor,
    borderWidth: borderWidth,
    borderRadius: `${borderRadius}px`,
    padding: `0 ${paddingHorizontal}px`,
    marginBottom: `${marginBottom}px`,
    boxSizing: 'border-box',
  };

  return (
    <Box sx={styles}>
      <TextField
        {...props}
        variant="outlined"
        fullWidth
        InputProps={{
          ...inputProps,
          style: {
            padding: 0,
            margin: 0,
            fontSize: 16,
            borderRadius: `${borderRadius}px`,
          },
        }}
      />
    </Box>
  );
};

export default Input;
