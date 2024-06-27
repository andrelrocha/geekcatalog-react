import React from "react";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";
import PhoneIcon from '@mui/icons-material/Phone';
import InputText from "../input-text";
import { isMobilePhone } from "../../../libs/validators/gov";

const DEFAULT_ERROR_MESSAGE = "Telefone Inválido";

const validate = (value: string) => {
  if (!value) return true;

  return isMobilePhone(value) || DEFAULT_ERROR_MESSAGE;
};

type InputPhoneProps<T extends FieldValues> = {
  control: any; 
  name: Path<T>;
  placeholder?: string;
  rules?: RegisterOptions<T>; 
  editable?: boolean;
};

const InputPhone = <T extends FieldValues>({
  control,
  name,
  placeholder = "(__) _____-____",
  rules,
  editable = true,
}: InputPhoneProps<T>) => {
  const handleMaskedChange = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    const formattedValue = cleanedValue
      .slice(0, 11) // Limita a 11 caracteres
      .replace(/(\d{2})(\d)/, "($1) $2") // Coloca parênteses após os dois primeiros dígitos e um espaço
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2"); // Coloca hífen após o quinto dígito

    return formattedValue;
  };

  let icon: React.ReactNode = <PhoneIcon />;

  return (
    <InputText
      control={control}
      name={name}
      icon={icon}
      placeholder={placeholder}
      rules={{ validate, ...rules }} 
      editable={editable}
      formatInternalValue={(str: string) => str.replace(/\D/g, "")} // Remove caracteres não numéricos ao enviar para o campo interno
      formatVisibleValue={handleMaskedChange} // Aplica a máscara ao valor visível
    />
  );
};

export default InputPhone;
