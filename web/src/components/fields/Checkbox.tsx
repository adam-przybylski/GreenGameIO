import { FC } from "react";
import { useController } from "react-hook-form";

type Props = {
  label: string;
  name: string;
};

const Checkbox: FC<Props> = ({ label, name }) => {
  const { field } = useController({ name });

  return (
    <>
      <input
        id={field.name}
        {...field}
        name={name}
        type="checkbox"
        checked={field.value}
      />
      <label htmlFor={field.name} className="ml-2">
        {label}
      </label>
    </>
  );
};

export default Checkbox;
