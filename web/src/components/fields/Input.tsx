import { FC } from "react";
import { useController } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ label, name, ...props }) => {
  const { field } = useController({ name });

  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input {...field} {...props} id={field.name} />
    </div>
  );
};

export default Input;
