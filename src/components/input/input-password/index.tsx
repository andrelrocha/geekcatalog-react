import { ComponentProps, useState } from "react"
import { FieldValues } from "react-hook-form"

import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { isValidPassword } from "../../../libs/validators/password"

import InputText from "../input-text"

const DEFAULT_ERROR_MESSAGE = "Invalid password"

const validate = (value: string) => {
  if (!value) return true

  return isValidPassword(value) || DEFAULT_ERROR_MESSAGE
}
const InputPassword = <T extends FieldValues>(props: ComponentProps<typeof InputText<T>>) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => setShowPassword(!showPassword)

  return (
    <InputText
      {...props}
      inputProps={{
        ...props.inputProps,
        type: showPassword ? 'text' : 'password',
      }}
      icon={0}
      rules={{ validate, ...props.rules }}
    >
      <InputAdornment position="end">
            <IconButton onClick={togglePassword} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
      </InputAdornment>
    </InputText>
  );
}

export default InputPassword