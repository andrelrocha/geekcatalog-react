import { ComponentProps, useState } from "react"
import { FieldValues } from "react-hook-form"

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
    <InputText<T>
      {...props}
      inputProps={{
        ...props.inputProps,
        type: showPassword ? 'text' : 'password',
      }}
      rules={{ validate, ...props.rules }}
      staticIcon={true}
      icon={showPassword ? <VisibilityOff /> : <Visibility />}
      iconClick={togglePassword}
    />
  );
}

export default InputPassword