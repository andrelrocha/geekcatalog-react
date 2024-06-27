import React from "react";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";
import InfoIcon from '@mui/icons-material/Info';
import InputText from "../input-text";
import { isCPF } from "../../../libs/validators/validations";

const DEFAULT_ERROR_MESSAGE = "Invalid CPF";

const validate = (value: string) => {
  if (!value) return true;

  return isCPF(value) || DEFAULT_ERROR_MESSAGE;
};

type InputCPFProps<T extends FieldValues> = {
  control: any; 
  name: Path<T>;
  placeholder?: string;
  rules?: RegisterOptions<T>; 
  editable?: boolean;
  label?: string;
};

const InputCPF = <T extends FieldValues>({
  control,
  name,
  placeholder = "___.___.___-__",
  rules,
  editable = true,
  label
}: InputCPFProps<T>) => {
  const handleMaskedChange = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    const formattedValue = cleanedValue
      .slice(0, 11) // Limita a 11 caracteres
      .replace(/(\d{3})(\d)/, "$1.$2") // Coloca ponto após o terceiro dígito
      .replace(/(\d{3})(\d)/, "$1.$2") // Coloca ponto após o sexto dígito
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca hífen após o nono dígito

    return formattedValue;
  };

  let icon: React.ReactNode = <InfoIcon />;

  return (
    <InputText
      label={label}
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

export default InputCPF;
