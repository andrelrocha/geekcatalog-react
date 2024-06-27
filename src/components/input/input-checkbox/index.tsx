import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";

const styles = {
  boxInput: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    margin: '0.5rem 0',
  },
  inputCheckbox: {
    display: 'flex',
    alignItems: 'center',
  },
};

type InputCheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: React.ReactNode;
  onChange?: (value: boolean) => void;
};

const InputCheckbox = <T extends FieldValues>({ control, name, label, onChange }: InputCheckboxProps<T>) => {
  return (
    <Box sx={styles.boxInput}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  if (onChange) onChange(e.target.checked);
                }}
              />
            }
            label={
              <Box sx={styles.inputCheckbox}>
                {label}
              </Box>
            }
          />
        )}
      />
    </Box>
  );
};

export default InputCheckbox;
