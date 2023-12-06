import { twMerge } from "tailwind-merge";

export const classNames = (...classNames: string[]) => {
  return twMerge(classNames);
};
