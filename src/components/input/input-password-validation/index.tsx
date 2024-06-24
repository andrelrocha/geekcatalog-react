import { ComponentProps, useState } from "react";
import { FieldValues } from "react-hook-form";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { isValidPassword } from "../../../libs/validators/password";
import InputText from "../input-text";

const DEFAULT_ERROR_MESSAGE = "Invalid Password";

const validate = (value: string) => {
  if (!value) return true;

  return isValidPassword(value) || DEFAULT_ERROR_MESSAGE;
};

const InputPasswordValidation = <T extends FieldValues>(
  props: ComponentProps<typeof InputText<T>>
) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <InputText
      {...props}
      inputProps={{
        ...props.inputProps,
        type: showPassword ? "text" : "password",

      }}
      rules={{ validate, ...props.rules }}
      icon={showPassword ? <VisibilityOff /> : <Visibility />}
      iconClick={togglePassword}
    />
  );
};

export default InputPasswordValidation;