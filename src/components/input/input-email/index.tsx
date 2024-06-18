import { ComponentProps } from "react";
import { FieldValues } from "react-hook-form";
import InputText from "../input-text";
import { isEmail } from "../../../libs/validators/email";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const validate = (value: string) => {
  if (!value) return true;

  return isEmail(value) || "Invalid Email";
};

const InputEmail = <T extends FieldValues>(props: ComponentProps<typeof InputText<T>>) => {
  const icon = <MailOutlineIcon />;

  return (
    <InputText
      {...props}
      icon={icon}
      rules={{ ...props.rules, validate }}
    />
  );
};

export default InputEmail;
