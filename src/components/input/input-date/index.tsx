import React from "react";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { isDateValid } from "../../../libs/validators/validations";
import InputText from "../input-text";

const DEFAULT_ERROR_MESSAGE = "Data Inválida";

const validate = (value: string) => {
  if (!value) return true;

  const reference = "before";

  return isDateValid(value, reference) || DEFAULT_ERROR_MESSAGE;
};

type InputDateProps<T extends FieldValues> = {
  control: any;
  name: Path<T>;
  placeholder?: string;
  rules?: RegisterOptions<T>;
  editable?: boolean;
  label?: string;
};

const InputDate = <T extends FieldValues>({
  control,
  name,
  placeholder = "__/__/____",
  rules,
  editable = true,
  label,
}: InputDateProps<T>) => {
  const handleMaskedChange = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    const formattedValue = cleanedValue
      .slice(0, 8) // Limita a 8 caracteres (99/99/9999)
      .replace(/(\d{2})(\d)/, "$1/$2") // Coloca barra após o segundo dígito
      .replace(/(\d{2})(\d)/, "$1/$2"); // Coloca barra após o quinto dígito

    return formattedValue;
  };

  let icon: React.ReactNode = <CalendarMonthIcon/>;

  return (
    <InputText
      label={label}
      control={control}
      name={name}
      icon={icon}
      placeholder={placeholder}
      rules={{ validate, ...rules }}
      editable={editable}
      formatInternalValue={(str: string) => handleMaskedChange(str)}
      formatVisibleValue={handleMaskedChange}
    />
  );
};

export default InputDate;
