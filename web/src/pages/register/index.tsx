import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/fields/Input";
import Button from "../../components/Button";

type Email = string;

interface RegisterSchema {
  email: Email;
  login: string;
  password: string;
}


const RegisterPage: FC = () => {

  const methods = useForm<RegisterSchema>({
    values: {
      email: "",
      login: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <>
      <p className="font-sans text-xl italic font-medium mt-1 text-center">Rejestracja</p>
      <div className="flex justify-center">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="pt-[50px] w-[60%]">
            <Input label="Email: " placeholder="Podaj email" name="email" />
            <Input label="Login: " placeholder="Podaj login" name="login" />
            <Input label="Hasło: " placeholder="Podaj hasło" name="password" type="password" />
            <div className="flex justify-center">
              <Button type="submit" label="Zarejestruj się" className="bg-nice-green w-full mt-6 h-9 rounded-md font-medium" />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}

export default RegisterPage;