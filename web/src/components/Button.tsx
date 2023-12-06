import { FC } from "react";

type props = { label: string } & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<props> = ({ label, ...props }) => {
  return <button {...props}>{label}</button>;
};

export default Button;
