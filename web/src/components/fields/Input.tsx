import { FC } from "react";
import { useController } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ label, name, ...props }) => {
  const { field } = useController({ name });

  return (
    <div className="flex flex-col mb-5">
      <label htmlFor={field.name} className="mb-2">{label}</label>
      <input {...field} {...props} id={field.name} className="border rounded-md h-9 pl-2 outline-nice-green" />
    </div>
  );
};

export default Input;
